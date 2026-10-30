'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ADVENTURES, STAYS, EXPERIENCES, DESTINATIONS } from '@/lib/data';

export interface TripItem {
  id: string;
  name: string;
  location: string;
  price: string;
  numericPrice: number;
  image: string;
  duration: string;
  type: 'adventure' | 'stay' | 'experience';
  category?: string;
  difficulty?: string;
  rating?: string;
  reviewCount?: number;
  reviewHighlight?: string;
  timeSlot?: string;
  bookingStatus?: 'in_trip' | 'ready_to_book' | 'booked';
  notes?: string;
}

export interface TripDay {
  dayNumber: number;
  date?: string;
  label?: string;
  items: TripItem[];
}

export interface ManualTrip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budgetLimit: number | null;
  days: TripDay[];
  unscheduledItems: TripItem[];
  isSavedToAccount?: boolean;
}

interface TripContextType {
  trip: ManualTrip;
  favorites: string[];
  tripCount: number;
  estimatedTotal: number;
  toastMessage: string | null;
  clearToast: () => void;
  addToTrip: (item: any, type?: 'adventure' | 'stay' | 'experience') => { success: boolean; message: string };
  removeFromTrip: (itemId: string) => void;
  assignToDay: (itemId: string, targetDayNumber: number) => void;
  unassignFromDay: (itemId: string, currentDayNumber: number) => void;
  moveToDay: (itemId: string, fromDayNumber: number, toDayNumber: number) => void;
  addDay: () => void;
  removeDay: (dayNumber: number) => void;
  setDates: (startDate: string, endDate: string) => void;
  setTravelers: (count: number) => void;
  setBudgetLimit: (budget: number | null) => void;
  setTripTitle: (title: string) => void;
  setDestination: (destination: string) => void;
  toggleFavorite: (itemId: string) => boolean;
  isFavorite: (itemId: string) => boolean;
  isInTrip: (itemId: string) => boolean;
  clearTrip: () => void;
  saveTripToAccount: () => Promise<{ success: boolean; message: string; tripId?: string }>;
}

const STORAGE_KEY_TRIP = 'tj_manual_trip_v2';
const STORAGE_KEY_FAVS = 'tj_favorites_v2';

function parsePriceToNumber(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}

export function getCanonicalCity(locationStr?: string): string {
  if (!locationStr) return 'General India';
  const loc = locationStr.toLowerCase();
  if (loc.includes('rishi') || loc.includes('shivpuri') || loc.includes('ganga') || loc.includes('mohan chatti') || loc.includes('tapovan')) return 'Rishikesh';
  if (loc.includes('manali') || loc.includes('solang') || loc.includes('rohtang') || loc.includes('kullu')) return 'Manali';
  if (loc.includes('ladakh') || loc.includes('leh') || loc.includes('nubra') || loc.includes('pangong') || loc.includes('zanskar') || loc.includes('chadar') || loc.includes('markha')) return 'Ladakh';
  if (loc.includes('kasol') || loc.includes('parvati') || loc.includes('kheerganga') || loc.includes('tosh') || loc.includes('chalal')) return 'Kasol';
  if (loc.includes('goa') || loc.includes('palolem') || loc.includes('anjuna') || loc.includes('panaji') || loc.includes('calangute')) return 'Goa';
  if (loc.includes('mussoorie') || loc.includes('landour') || loc.includes('dhanaulti')) return 'Mussoorie';
  if (loc.includes('bir') || loc.includes('billing')) return 'Bir Billing';
  if (loc.includes('spiti') || loc.includes('kaza') || loc.includes('chandra taal')) return 'Spiti Valley';
  if (loc.includes('meghalaya') || loc.includes('shillong') || loc.includes('cherrapunji') || loc.includes('dawki')) return 'Meghalaya';
  if (loc.includes('uttarakhand')) return 'Rishikesh';
  if (loc.includes('himachal')) return 'Manali';
  return locationStr.split(',')[0].trim();
}

function normalizeToTripItem(raw: any, type: 'adventure' | 'stay' | 'experience' = 'adventure'): TripItem {
  const loc = raw.location || raw.region || raw.name || 'India';
  const price = raw.price || (raw.numericPrice ? `₹${raw.numericPrice.toLocaleString('en-IN')}` : 'Included in Plan');
  return {
    id: raw.id,
    name: raw.name || raw.title || 'Adventure Experience',
    location: loc,
    price: price,
    numericPrice: raw.numericPrice || parsePriceToNumber(raw.price),
    image: raw.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    duration: raw.duration || raw.days || (type === 'stay' ? 'Overnight' : '2–3 Hours'),
    type,
    category: raw.category || raw.difficulty || (type === 'stay' ? 'Lodging' : 'Outdoor'),
    difficulty: raw.difficulty,
    rating: typeof raw.rating === 'number' ? raw.rating.toFixed(1) : (raw.rating || '4.8'),
    reviewCount: raw.reviewCount || raw.reviews || 42,
    reviewHighlight: raw.reviewHighlight || 'Verified explorer favorite with top safety ratings.',
    bookingStatus: 'in_trip',
    timeSlot: 'Morning Slot (09:00 AM)',
  };
}

const DEFAULT_TRIP: ManualTrip = {
  id: 'draft-trip-initial',
  title: 'My Custom Adventure',
  destination: 'Rishikesh',
  startDate: '',
  endDate: '',
  travelers: 2,
  budgetLimit: null,
  days: [
    { dayNumber: 1, label: 'Day 01', items: [] },
    { dayNumber: 2, label: 'Day 02', items: [] },
    { dayNumber: 3, label: 'Day 03', items: [] },
  ],
  unscheduledItems: [],
  isSavedToAccount: false,
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trip, setTrip] = useState<ManualTrip>(DEFAULT_TRIP);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Restore state from localStorage safely on client mount
  useEffect(() => {
    try {
      const savedTripStr = localStorage.getItem(STORAGE_KEY_TRIP);
      if (savedTripStr) {
        const parsed = JSON.parse(savedTripStr);
        if (parsed && Array.isArray(parsed.days)) {
          setTrip(parsed);
        }
      }
      const savedFavsStr = localStorage.getItem(STORAGE_KEY_FAVS);
      if (savedFavsStr) {
        const parsedFavs = JSON.parse(savedFavsStr);
        if (Array.isArray(parsedFavs)) {
          setFavorites(parsedFavs);
        }
      }
    } catch {
      // Graceful fallback for private browsing or disabled storage
    }
    setHasHydrated(true);
  }, []);

  // Save changes to localStorage after hydration
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_TRIP, JSON.stringify(trip));
      sessionStorage.setItem('tj_active_trip', JSON.stringify({
        destination: trip.destination,
        checkIn: trip.startDate || '2026-10-15',
        checkOut: trip.endDate || '2026-10-18',
        adults: trip.travelers,
        children: 0,
        budgetTier: trip.budgetLimit ? `₹${trip.budgetLimit.toLocaleString('en-IN')}` : 'EXPLORER',
      }));
    } catch {}
  }, [trip, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(favorites));
    } catch {}
  }, [favorites, hasHydrated]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Count unique items across unscheduled items and all days
  const tripCount = useMemo(() => {
    const itemIds = new Set<string>();
    trip.unscheduledItems.forEach((it) => itemIds.add(it.id));
    trip.days.forEach((day) => day.items.forEach((it) => itemIds.add(it.id)));
    return itemIds.size;
  }, [trip]);

  // Check if item is in trip
  const isInTrip = useCallback((itemId: string): boolean => {
    if (trip.unscheduledItems.some((it) => it.id.toLowerCase() === itemId.toLowerCase())) return true;
    return trip.days.some((d) => d.items.some((it) => it.id.toLowerCase() === itemId.toLowerCase()));
  }, [trip]);

  // Calculate estimated total based on numeric prices and traveler count
  const estimatedTotal = useMemo(() => {
    let sum = 0;
    const allItems: TripItem[] = [
      ...trip.unscheduledItems,
      ...trip.days.flatMap((d) => d.items),
    ];
    allItems.forEach((it) => {
      if (it.type === 'stay') {
        // Stays are typically per-room/per-night
        sum += it.numericPrice;
      } else {
        // Adventures and activities are per traveler
        sum += it.numericPrice * (trip.travelers || 1);
      }
    });
    return sum;
  }, [trip]);

  // Add an experience to the manual trip (goes to unscheduled items first)
  const addToTrip = useCallback((rawItem: any, type: 'adventure' | 'stay' | 'experience' = 'adventure') => {
    if (!rawItem || !rawItem.id) {
      return { success: false, message: 'Invalid item selection.' };
    }

    if (isInTrip(rawItem.id)) {
      showToast(`"${rawItem.name || 'Experience'}" is already in your trip!`);
      return { success: false, message: 'Already in your trip.' };
    }

    const normalized = normalizeToTripItem(rawItem, type);

    setTrip((prev) => ({
      ...prev,
      unscheduledItems: [...prev.unscheduledItems, normalized],
    }));

    const city = getCanonicalCity(normalized.location);
    showToast(`Added "${normalized.name}" to your ${city} plan!`);
    return { success: true, message: `Added "${normalized.name}" to your ${city} plan.` };
  }, [isInTrip, showToast]);

  // Remove an experience from the trip completely
  const removeFromTrip = useCallback((itemId: string) => {
    setTrip((prev) => {
      const targetItem = [
        ...prev.unscheduledItems,
        ...prev.days.flatMap((d) => d.items),
      ].find((it) => it.id.toLowerCase() === itemId.toLowerCase());

      const newUnscheduled = prev.unscheduledItems.filter(
        (it) => it.id.toLowerCase() !== itemId.toLowerCase()
      );
      const newDays = prev.days.map((day) => ({
        ...day,
        items: day.items.filter((it) => it.id.toLowerCase() !== itemId.toLowerCase()),
      }));

      if (targetItem) {
        showToast(`Removed "${targetItem.name}" from your trip.`);
      }

      return {
        ...prev,
        unscheduledItems: newUnscheduled,
        days: newDays,
      };
    });
  }, [showToast]);

  // Assign an experience from unscheduled (or another day) to a specific day
  const assignToDay = useCallback((itemId: string, targetDayNumber: number) => {
    setTrip((prev) => {
      let itemToMove: TripItem | undefined;

      // Check in unscheduled
      const newUnscheduled = prev.unscheduledItems.filter((it) => {
        if (it.id.toLowerCase() === itemId.toLowerCase()) {
          itemToMove = it;
          return false;
        }
        return true;
      });

      // If not in unscheduled, check in other days
      const daysCleaned = prev.days.map((day) => ({
        ...day,
        items: day.items.filter((it) => {
          if (it.id.toLowerCase() === itemId.toLowerCase()) {
            itemToMove = it;
            return false;
          }
          return true;
        }),
      }));

      if (!itemToMove) return prev;

      // Add to target day
      const updatedDays = daysCleaned.map((day) => {
        if (day.dayNumber === targetDayNumber) {
          return {
            ...day,
            items: [...day.items, itemToMove!],
          };
        }
        return day;
      });

      showToast(`Assigned "${itemToMove.name}" to Day ${targetDayNumber}`);
      return {
        ...prev,
        unscheduledItems: newUnscheduled,
        days: updatedDays,
      };
    });
  }, [showToast]);

  // Move an item from day A back to unscheduled items
  const unassignFromDay = useCallback((itemId: string, fromDayNumber: number) => {
    setTrip((prev) => {
      let itemToUnassign: TripItem | undefined;
      const updatedDays = prev.days.map((day) => {
        if (day.dayNumber === fromDayNumber) {
          return {
            ...day,
            items: day.items.filter((it) => {
              if (it.id.toLowerCase() === itemId.toLowerCase()) {
                itemToUnassign = it;
                return false;
              }
              return true;
            }),
          };
        }
        return day;
      });

      if (!itemToUnassign) return prev;

      showToast(`Moved "${itemToUnassign.name}" back to unscheduled experiences.`);
      return {
        ...prev,
        days: updatedDays,
        unscheduledItems: [...prev.unscheduledItems, itemToUnassign],
      };
    });
  }, [showToast]);

  // Move directly between two days
  const moveToDay = useCallback((itemId: string, fromDayNumber: number, toDayNumber: number) => {
    if (fromDayNumber === toDayNumber) return;
    setTrip((prev) => {
      let itemToMove: TripItem | undefined;
      const step1Days = prev.days.map((day) => {
        if (day.dayNumber === fromDayNumber) {
          return {
            ...day,
            items: day.items.filter((it) => {
              if (it.id.toLowerCase() === itemId.toLowerCase()) {
                itemToMove = it;
                return false;
              }
              return true;
            }),
          };
        }
        return day;
      });

      if (!itemToMove) return prev;

      const finalDays = step1Days.map((day) => {
        if (day.dayNumber === toDayNumber) {
          return {
            ...day,
            items: [...day.items, itemToMove!],
          };
        }
        return day;
      });

      showToast(`Moved "${itemToMove.name}" to Day ${toDayNumber}`);
      return {
        ...prev,
        days: finalDays,
      };
    });
  }, [showToast]);

  // Add a new itinerary day
  const addDay = useCallback(() => {
    setTrip((prev) => {
      const nextDayNum = prev.days.length + 1;
      let computedDate = '';
      if (prev.startDate) {
        const d = new Date(prev.startDate);
        d.setDate(d.getDate() + (nextDayNum - 1));
        computedDate = d.toISOString().split('T')[0];
      }
      return {
        ...prev,
        days: [
          ...prev.days,
          {
            dayNumber: nextDayNum,
            label: `Day ${String(nextDayNum).padStart(2, '0')}`,
            date: computedDate,
            items: [],
          },
        ],
      };
    });
  }, []);

  // Remove an itinerary day (items on it return to unscheduled)
  const removeDay = useCallback((dayNumber: number) => {
    setTrip((prev) => {
      if (prev.days.length <= 1) {
        showToast('Itinerary must have at least one day.');
        return prev;
      }

      const dayToRemove = prev.days.find((d) => d.dayNumber === dayNumber);
      const itemsToRescue = dayToRemove ? dayToRemove.items : [];

      // Filter out the day and re-index remaining days
      const filtered = prev.days
        .filter((d) => d.dayNumber !== dayNumber)
        .map((d, idx) => ({
          ...d,
          dayNumber: idx + 1,
          label: `Day ${String(idx + 1).padStart(2, '0')}`,
        }));

      showToast(`Removed Day ${dayNumber}. Its activities were moved to unscheduled.`);
      return {
        ...prev,
        days: filtered,
        unscheduledItems: [...prev.unscheduledItems, ...itemsToRescue],
      };
    });
  }, [showToast]);

  // Set trip dates with calendar day mapping
  const setDates = useCallback((startDate: string, endDate: string) => {
    setTrip((prev) => {
      const updatedDays = prev.days.map((day) => {
        let dayDate = '';
        if (startDate) {
          const d = new Date(startDate);
          d.setDate(d.getDate() + (day.dayNumber - 1));
          dayDate = d.toISOString().split('T')[0];
        }
        return {
          ...day,
          date: dayDate,
        };
      });

      return {
        ...prev,
        startDate,
        endDate,
        days: updatedDays,
      };
    });
  }, []);

  const setTravelers = useCallback((travelers: number) => {
    setTrip((prev) => ({ ...prev, travelers: Math.max(1, travelers) }));
  }, []);

  const setBudgetLimit = useCallback((budgetLimit: number | null) => {
    setTrip((prev) => ({ ...prev, budgetLimit }));
  }, []);

  const setTripTitle = useCallback((title: string) => {
    setTrip((prev) => ({ ...prev, title }));
  }, []);

  const setDestination = useCallback((destination: string) => {
    setTrip((prev) => ({ ...prev, destination }));
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback((itemId: string): boolean => {
    let nowFav = false;
    setFavorites((prev) => {
      if (prev.includes(itemId)) {
        nowFav = false;
        showToast('Removed from saved favorites.');
        return prev.filter((id) => id !== itemId);
      } else {
        nowFav = true;
        showToast('Saved to your favorites!');
        return [...prev, itemId];
      }
    });
    return nowFav;
  }, [showToast]);

  const isFavorite = useCallback((itemId: string): boolean => {
    return favorites.includes(itemId);
  }, [favorites]);

  const clearTrip = useCallback(() => {
    setTrip({
      ...DEFAULT_TRIP,
      id: `draft-trip-${Date.now()}`,
    });
    try {
      localStorage.removeItem(STORAGE_KEY_TRIP);
    } catch {}
    showToast('Trip itinerary cleared.');
  }, [showToast]);

  // Save trip to backend API
  const saveTripToAccount = useCallback(async (): Promise<{ success: boolean; message: string; tripId?: string }> => {
    try {
      const response = await fetch('/api/v1/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: trip.title,
          destinationId: trip.destination.toLowerCase(),
          startDate: trip.startDate || new Date().toISOString().split('T')[0],
          endDate: trip.endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          travelersCount: trip.travelers,
          budgetTier: trip.budgetLimit ? `₹${trip.budgetLimit}` : 'EXPLORER',
          days: trip.days.map((d) => ({
            day: d.dayNumber,
            label: d.label || `Day ${d.dayNumber}`,
            items: d.items.map((it) => ({
              id: it.id,
              name: it.name,
              time: it.timeSlot || '10:00 AM',
              duration: it.duration,
              price: it.price,
              status: it.bookingStatus || 'pending',
            })),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const resData = await response.json();
      const savedId = resData.data?.id || `trip-${Date.now()}`;

      setTrip((prev) => ({
        ...prev,
        id: savedId,
        isSavedToAccount: true,
      }));

      showToast('Adventure trip saved successfully to your account!');
      return { success: true, message: 'Saved successfully', tripId: savedId };
    } catch (err: any) {
      // Even if network fails, trip is preserved locally
      return {
        success: false,
        message: 'Could not connect to server. Trip is safely stored in your browser draft.',
      };
    }
  }, [trip, showToast]);

  return (
    <TripContext.Provider
      value={{
        trip,
        favorites,
        tripCount,
        estimatedTotal,
        toastMessage,
        clearToast,
        addToTrip,
        removeFromTrip,
        assignToDay,
        unassignFromDay,
        moveToDay,
        addDay,
        removeDay,
        setDates,
        setTravelers,
        setBudgetLimit,
        setTripTitle,
        setDestination,
        toggleFavorite,
        isFavorite,
        isInTrip,
        clearTrip,
        saveTripToAccount,
      }}
    >
      {children}
      {/* Subtle floating toast notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#0a101d]/95 border border-[var(--color-accent)]/50 rounded-xl shadow-2xl backdrop-blur-md text-white text-sm animate-fade-in pointer-events-auto"
          style={{ maxWidth: '360px', boxShadow: '0 8px 32px rgba(0, 174, 239, 0.25)' }}
        >
          <span className="flex h-2 w-2 rounded-full bg-[var(--color-accent)] shrink-0 animate-ping" />
          <span className="flex-1 font-medium">{toastMessage}</span>
          <button
            onClick={clearToast}
            aria-label="Close notification"
            className="text-white/60 hover:text-white text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
