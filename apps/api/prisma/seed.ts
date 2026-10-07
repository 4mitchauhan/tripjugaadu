import { PrismaClient, Role, Difficulty, BookingStatus, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting TripJugaadu database seed...');

  // 1. Clean existing records in reverse dependency order
  await prisma.payment.deleteMany();
  await prisma.bookingItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.tripItem.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.room.deleteMany();
  await prisma.stay.deleteMany();
  await prisma.adventure.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.guide.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const traveler = await prisma.user.create({
    data: {
      email: 'traveler@tripjugaadu.com',
      passwordHash: '$2b$10$ep/C4.rU55jG0Pau1H091.2i2/1lX4j6/4X9q.0X0Z9P0u0Z0u0Z0', // hashed demo
      firstName: 'Amit',
      lastName: 'Sharma',
      phone: '+919876543210',
      role: Role.USER,
      isVerified: true,
      profile: {
        create: {
          bio: 'Himalayan adventurer, rapid paddler, and street food enthusiast.',
          city: 'New Delhi',
          state: 'Delhi',
          preferredActivities: ['Rafting', 'Trekking', 'High-altitude passes'],
          travelStyle: 'Fast & Adventurous'
        }
      }
    }
  });

  const providerUser = await prisma.user.create({
    data: {
      email: 'himalayan.expeditions@tripjugaadu.com',
      passwordHash: '$2b$10$ep/C4.rU55jG0Pau1H091.2i2/1lX4j6/4X9q.0X0Z9P0u0Z0u0Z0',
      firstName: 'Rajesh',
      lastName: 'Negi',
      phone: '+919812345678',
      role: Role.PROVIDER,
      isVerified: true,
      provider: {
        create: {
          businessName: 'Himalayan Rapids & Trails Ltd.',
          businessRegNo: 'UT-UK-2021-99881',
          verified: true,
          rating: 4.9
        }
      }
    }
  });

  console.log(`✅ Created test users: ${traveler.email}, ${providerUser.email}`);

  // 3. Create Destinations
  const rishikesh = await prisma.destination.create({
    data: {
      slug: 'rishikesh',
      name: 'Rishikesh',
      region: 'Uttarakhand',
      state: 'Uttarakhand',
      category: 'Adventure / Spiritual',
      daysRecommend: '03 Days',
      bestSeason: 'Sep – Jun',
      heroImage: 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=1200&q=80',
      description: 'The adventure capital of India, nestled in the foothills of the Himalayas along the sacred emerald waters of the Ganges. Known globally for white-water rafting, bungee jumping, and soul-stirring Ganga Aarti.',
      latitude: 30.0869,
      longitude: 78.2676,
      featured: true
    }
  });

  const manali = await prisma.destination.create({
    data: {
      slug: 'manali',
      name: 'Manali',
      region: 'Himachal Pradesh',
      state: 'Himachal Pradesh',
      category: 'Adventure / Nature',
      daysRecommend: '04 Days',
      bestSeason: 'Oct – Jun',
      heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
      description: 'A valley of dreams framed by snow-capped Himalayan ridges, cedar forests, and rushing Beas river trails. The gateway to Solang, Rohtang, and Spiti Valley.',
      latitude: 32.2432,
      longitude: 77.1892,
      featured: true
    }
  });

  const ladakh = await prisma.destination.create({
    data: {
      slug: 'ladakh',
      name: 'Ladakh',
      region: 'Jammu & Kashmir',
      state: 'Ladakh',
      category: 'High Altitude / Nature',
      daysRecommend: '07 Days',
      bestSeason: 'Jun – Sep',
      heroImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
      description: 'The land of high mountain passes, turquoise lakes (Pangong & Tso Moriri), centuries-old Tibetan Buddhist monasteries, and barren moonscapes.',
      latitude: 34.1526,
      longitude: 77.5771,
      featured: true
    }
  });

  const goa = await prisma.destination.create({
    data: {
      slug: 'goa',
      name: 'Goa',
      region: 'Western India',
      state: 'Goa',
      category: 'Beach / Water Sports',
      daysRecommend: '04 Days',
      bestSeason: 'Nov – Feb',
      heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
      description: 'Sun-drenched golden beaches, Portuguese colonial architecture, vibrant night markets, and marine diving expeditions in the Arabian Sea.',
      latitude: 15.2993,
      longitude: 74.1240,
      featured: false
    }
  });

  const kasol = await prisma.destination.create({
    data: {
      slug: 'kasol',
      name: 'Kasol',
      region: 'Himachal Pradesh',
      state: 'Himachal Pradesh',
      category: 'Trekking / Nature',
      daysRecommend: '03 Days',
      bestSeason: 'Mar – Jun & Sep – Nov',
      heroImage: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1200&q=80',
      description: 'The scenic basecamp of Parvati Valley. Famous for riverside pine forest trails, Kheerganga hot springs trek, and serene bohemian cafes.',
      latitude: 32.0100,
      longitude: 77.3150,
      featured: false
    }
  });

  console.log('✅ Created 5 core Indian destinations');

  // 4. Create Adventures
  await prisma.adventure.createMany({
    data: [
      {
        destinationId: rishikesh.id,
        slug: 'white-water-rafting',
        name: 'White Water Rafting (Grade III/IV)',
        category: 'Water',
        difficulty: Difficulty.MODERATE,
        duration: '3–4 Hours',
        basePrice: 3999,
        capacity: 24,
        heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
        description: 'Conquer the legendary Three Blind Mice, Golf Course, and Roller Coaster rapids on the Ganga, accompanied by international whitewater rescue instructors.',
        requirements: ['Minimum age: 14 years', 'Moderate physical stamina', 'Life jacket provided'],
        whatToCarry: ['Waterproof pouch', 'Quick-dry change of clothes', 'Strap-on sandals'],
        whatToWear: ['Nylon rash guard or quick-dry t-shirt', 'Synthetic board shorts'],
        safetyGuidelines: ['Certified river guides in every raft', 'Safety kayak escort included'],
        rating: 4.9,
        reviewCount: 312,
        featured: true
      },
      {
        destinationId: rishikesh.id,
        slug: 'bungee-jumping-83m',
        name: 'Bungee Jumping (83m Fixed Platform)',
        category: 'Extreme',
        difficulty: Difficulty.EXTREME,
        duration: '1–2 Hours',
        basePrice: 5200,
        capacity: 15,
        heroImage: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
        description: 'Leap off India’s premier bungee cliff at Mohanchatti over the rocky Hall river canyon with New Zealand jump masters.',
        requirements: ['Age 12–45 years', 'Weight: 40kg to 110kg', 'No high blood pressure or cardiac history'],
        whatToCarry: ['Government ID', 'Comfortable footwear with socks'],
        whatToWear: ['Snug fitting active wear', 'Tied hair'],
        safetyGuidelines: ['Triple-redundant braided latex bungee cords', 'Daily equipment stress tests'],
        rating: 4.9,
        reviewCount: 428,
        featured: true
      },
      {
        destinationId: manali.id,
        slug: 'hampta-pass-trek',
        name: 'Hampta Pass & Chandratal Trek',
        category: 'Land',
        difficulty: Difficulty.MODERATE_HARD,
        duration: '5 Days',
        basePrice: 8499,
        capacity: 18,
        heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        description: 'Cross from the lush pine forests of Kullu valley to the dramatic arid cliffs of Spiti across the 14,000 ft Hampta Pass.',
        requirements: ['Prior trek experience recommended', 'Cardio endurance for 5-6 hours daily hiking'],
        whatToCarry: ['High-traction trekking boots', 'Trekking poles', 'Thermal layers (-5°C rating)'],
        whatToWear: ['Fleece layers', 'Waterproof outer shell'],
        safetyGuidelines: ['Certified wilderness first responders', 'High-altitude medical oxygen carried'],
        rating: 4.8,
        reviewCount: 186,
        featured: true
      },
      {
        destinationId: goa.id,
        slug: 'scuba-diving-grande-island',
        name: 'Scuba Diving at Grande Island',
        category: 'Water',
        difficulty: Difficulty.EASY_MODERATE,
        duration: '3 Hours',
        basePrice: 4500,
        capacity: 12,
        heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        description: 'PADI certified dive master guided diving exploring Suzy’s Wreck, coral banks, and schools of reef fish.',
        requirements: ['No respiratory or inner ear conditions', 'Minimum age: 10 years'],
        whatToCarry: ['Swimwear', 'Dry towel', 'Sunscreen'],
        whatToWear: ['Swimwear under neoprene wetsuit provided'],
        safetyGuidelines: ['1-on-1 instructor ratio underwater', 'Full PADI safety briefing'],
        rating: 4.7,
        reviewCount: 94,
        featured: false
      }
    ]
  });

  console.log('✅ Created adventures with requirements and equipment data');

  // 5. Create Stays
  await prisma.stay.createMany({
    data: [
      {
        destinationId: rishikesh.id,
        slug: 'riverside-luxury-retreat',
        name: 'Riverside Luxury Retreat',
        stayType: 'Luxury Boutique Resort',
        address: 'Tapovan Bypass Road, Rishikesh, Uttarakhand',
        rating: 4.8,
        basePrice: 6499,
        heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        amenities: ['Private River Access', 'Ayurvedic Spa', 'Infinity Pool', 'Organic Cafe', 'High-Speed Wi-Fi'],
        description: 'A peaceful river sanctuary overlooking the Ganges with curated yoga decks and private balconies facing the Rajaji National Park ridge.'
      },
      {
        destinationId: manali.id,
        slug: 'snow-pine-mountain-lodge',
        name: 'Snow Pine Mountain Lodge',
        stayType: 'Alpine Cedar Chalet',
        address: 'Old Manali Village, Himachal Pradesh',
        rating: 4.6,
        basePrice: 4999,
        heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        amenities: ['Stone Fireplace', 'Panoramic Glacial Views', 'Bonfire Pit', 'Apple Orchard Walk', 'In-house Chef'],
        description: 'Rustic Himalayan wood and stone architecture nestled in quiet apple orchards away from the bustle of the town.'
      }
    ]
  });

  console.log('✅ Created stays');

  // 6. Create Trip & Itinerary for Demo User
  const demoTrip = await prisma.trip.create({
    data: {
      userId: traveler.id,
      destinationId: rishikesh.id,
      title: 'Rishikesh High-Adrenaline & River Retreat',
      startDate: new Date('2026-10-12'),
      endDate: new Date('2026-10-15'),
      travelersCount: 2,
      budgetTier: 'EXPLORER',
      readinessScore: 80,
      items: {
        create: [
          { dayNumber: 1, orderIndex: 1, title: 'Arrival & Riverside Check-in', itemType: 'STAY', startTime: '12:00 PM', duration: '1 hr', status: 'confirmed', estimatedCost: '₹6,499' },
          { dayNumber: 1, orderIndex: 2, title: 'Parmarth Niketan Ganga Aarti', itemType: 'ACTIVITY', startTime: '6:00 PM', duration: '1.5 hrs', status: 'pending', estimatedCost: 'Free' },
          { dayNumber: 2, orderIndex: 1, title: 'White Water Rafting (Shivpuri to NIM)', itemType: 'ADVENTURE', startTime: '8:00 AM', duration: '3.5 hrs', status: 'confirmed', estimatedCost: '₹3,999' },
          { dayNumber: 2, orderIndex: 2, title: 'Beatles Ashram Heritage Exploration', itemType: 'EXPERIENCE', startTime: '2:30 PM', duration: '2 hrs', status: 'pending', estimatedCost: '₹600' },
          { dayNumber: 3, orderIndex: 1, title: 'Mohanchatti Bungee Jump (83m)', itemType: 'ADVENTURE', startTime: '9:00 AM', duration: '2 hrs', status: 'confirmed', estimatedCost: '₹5,200' },
          { dayNumber: 3, orderIndex: 2, title: 'Departure to Dehradun Airport', itemType: 'TRANSPORT', startTime: '4:00 PM', duration: '1.5 hrs', status: 'pending', estimatedCost: '₹1,200' }
        ]
      }
    }
  });

  // 7. Create Sample Booking
  await prisma.booking.create({
    data: {
      bookingRef: 'TJ-784219',
      userId: traveler.id,
      tripId: demoTrip.id,
      status: BookingStatus.CONFIRMED,
      subtotal: 21699,
      serviceFee: 799,
      discountAmount: 1500,
      totalAmount: 20998,
      guestCount: 2,
      checkInDate: new Date('2026-10-12'),
      checkOutDate: new Date('2026-10-15'),
      items: {
        create: [
          { itemType: 'ADVENTURE', itemId: 'rafting-01', itemName: 'White Water Rafting (Shivpuri)', unitPrice: 3999, quantity: 1, scheduledDate: new Date('2026-10-13'), timeSlot: '8:00 AM' },
          { itemType: 'STAY', itemId: 'stay-01', itemName: 'Riverside Luxury Retreat (3 Nights)', unitPrice: 19497, quantity: 1, scheduledDate: new Date('2026-10-12') },
          { itemType: 'ADVENTURE', itemId: 'bungee-01', itemName: 'Bungee Jumping (Mohanchatti)', unitPrice: 5200, quantity: 2, scheduledDate: new Date('2026-10-14'), timeSlot: '9:00 AM' }
        ]
      },
      payments: {
        create: {
          razorpayOrderId: 'order_test_99214A',
          razorpayPaymentId: 'pay_test_99214B',
          razorpaySignature: 'sig_mock_verified_signature_99214',
          amount: 20998,
          currency: 'INR',
          status: PaymentStatus.CAPTURED,
          paymentMethod: 'UPI'
        }
      }
    }
  });

  console.log('✅ Created demo trip, itinerary, booking and mock payment');
  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
