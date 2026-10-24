'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, CalendarCheck, User, CreditCard, ArrowRight } from 'lucide-react';

export default function SearchPanel() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState('10000');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('q', destination);
    if (dates) params.set('dates', dates);
    if (travelers) params.set('travelers', travelers);
    if (budget) params.set('budget', budget);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-panel">
      <div className="search-panel__field">
        <label htmlFor="search-dest" className="search-panel__label flex items-center gap-1">
          <MapPin size={12} strokeWidth={1.8} className="text-[var(--color-accent)] inline mr-0.5" /> Destination
        </label>
        <select
          id="search-dest"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="search-panel__value bg-transparent border-none outline-none cursor-pointer w-full text-white"
          style={{ appearance: 'none', WebkitAppearance: 'none' }}
        >
          <option value="" style={{ background: '#0a101d', color: '#fff' }}>Where to?</option>
          <option value="Rishikesh" style={{ background: '#0a101d', color: '#fff' }}>Rishikesh</option>
          <option value="Manali" style={{ background: '#0a101d', color: '#fff' }}>Manali</option>
          <option value="Ladakh" style={{ background: '#0a101d', color: '#fff' }}>Ladakh</option>
          <option value="Goa" style={{ background: '#0a101d', color: '#fff' }}>Goa</option>
          <option value="Kasol" style={{ background: '#0a101d', color: '#fff' }}>Kasol</option>
        </select>
      </div>

      <div className="search-panel__field">
        <label htmlFor="search-dates" className="search-panel__label flex items-center gap-1">
          <CalendarCheck size={12} strokeWidth={1.8} className="text-[var(--color-accent)] inline mr-0.5" /> Dates
        </label>
        <input
          id="search-dates"
          type="date"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="search-panel__value bg-transparent border-none outline-none cursor-pointer w-full text-white"
          style={{ colorScheme: 'dark' }}
        />
      </div>

      <div className="search-panel__field">
        <label htmlFor="search-travelers" className="search-panel__label flex items-center gap-1">
          <User size={12} strokeWidth={1.8} className="text-[var(--color-accent)] inline mr-0.5" /> Travelers
        </label>
        <select
          id="search-travelers"
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          className="search-panel__value bg-transparent border-none outline-none cursor-pointer w-full text-white"
          style={{ appearance: 'none', WebkitAppearance: 'none' }}
        >
          <option value="1" style={{ background: '#0a101d', color: '#fff' }}>01 Person</option>
          <option value="2" style={{ background: '#0a101d', color: '#fff' }}>02 People</option>
          <option value="3" style={{ background: '#0a101d', color: '#fff' }}>03 People</option>
          <option value="4" style={{ background: '#0a101d', color: '#fff' }}>04+ People</option>
        </select>
      </div>

      <div className="search-panel__field">
        <label htmlFor="search-budget" className="search-panel__label flex items-center gap-1">
          <CreditCard size={12} strokeWidth={1.8} className="text-[var(--color-accent)] inline mr-0.5" /> Budget
        </label>
        <select
          id="search-budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="search-panel__value bg-transparent border-none outline-none cursor-pointer w-full text-white"
          style={{ appearance: 'none', WebkitAppearance: 'none' }}
        >
          <option value="5000" style={{ background: '#0a101d', color: '#fff' }}>₹5K</option>
          <option value="10000" style={{ background: '#0a101d', color: '#fff' }}>₹10K</option>
          <option value="25000" style={{ background: '#0a101d', color: '#fff' }}>₹25K</option>
          <option value="50000" style={{ background: '#0a101d', color: '#fff' }}>₹50K+</option>
        </select>
      </div>

      <button type="submit" className="search-panel__btn flex items-center gap-1.5" aria-label="Perform search">
        <Search size={14} strokeWidth={2} />
        <span>Search</span>
        <ArrowRight size={14} strokeWidth={2} />
      </button>
    </form>
  );
}
