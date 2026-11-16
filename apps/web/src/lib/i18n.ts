/* ============================================================
   TRIPJUGAADU — GLOBAL I18N & MULTI-CURRENCY ENGINE
   Phase 6 Enterprise Localization & Financial Display Layer
   ============================================================ */

export type Locale = 'en' | 'hi' | 'hi-en';
export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyMeta {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromInr: number; // 1 INR = rateFromInr
  locale: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateFromInr: 1.0, locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateFromInr: 0.012, locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateFromInr: 0.011, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateFromInr: 0.0094, locale: 'en-GB' },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rateFromInr: 0.044, locale: 'ar-AE' },
};

export const LOCALES: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🌐' },
  hi: { label: 'हिन्दी', flag: '🇮🇳' },
  'hi-en': { label: 'Hinglish', flag: '🇮🇳' },
};

export const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.explore': 'Explore',
    'nav.adventures': 'Adventures',
    'nav.stays': 'Stays',
    'nav.experiences': 'Experiences',
    'nav.trips': 'Trip Builder',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.search': 'Search',
    'nav.admin': 'Admin Console',

    // Hero
    'hero.badge': 'INDIA’S INTELLIGENT TRAVEL ECOSYSTEM',
    'hero.title_pre': 'TRAVEL SMARTER.',
    'hero.title_post': 'EXPLORE DEEPER.',
    'hero.desc': 'Discover extraordinary destinations, high-altitude expeditions, and verified local operators through one travel platform.',
    'hero.cta_plan': 'Build Expedition',
    'hero.cta_explore': 'Discover Places',
    'hero.search_placeholder': 'Where do you want to explore? (e.g. White water rafting in Rishikesh)',

    // Sections
    'sec.featured_dest': 'Curated Destinations',
    'sec.featured_dest_sub': 'Handpicked Indian locations with verified safety and environmental protocols',
    'sec.top_adventures': 'High-Adrenaline Adventures',
    'sec.top_adventures_sub': 'Certified equipment, rescue escorts, and vetted mountain instructors',
    'sec.stays_title': 'Riverside & Wilderness Stays',
    'sec.stays_sub': 'Eco-resorts, boutique homestays, and alpine basecamps',

    // Common
    'btn.book_now': 'Book Now',
    'btn.view_details': 'View Details',
    'btn.start_planning': 'Start Planning',
    'label.per_person': '/ person',
    'label.per_night': '/ night',
    'label.difficulty': 'Difficulty',
    'label.duration': 'Duration',
    'label.readiness': 'Readiness Score',
  },

  hi: {
    // Nav
    'nav.explore': 'स्थान खोजें',
    'nav.adventures': 'रोमांचक यात्राएं',
    'nav.stays': 'ठहरने के स्थान',
    'nav.experiences': 'अनुभव',
    'nav.trips': 'यात्रा योजनाकार',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.login': 'लॉगिन',
    'nav.search': 'खोजें',
    'nav.admin': 'प्रशासक पैनल',

    // Hero
    'hero.badge': 'भारत का बुद्धिमान यात्रा मंच',
    'hero.title_pre': 'समझदारी से यात्रा करें।',
    'hero.title_post': 'गहराई से अनुभव करें।',
    'hero.desc': 'असाधारण स्थलों, हिमालयी अभियानों और प्रमाणित स्थानीय ऑपरेटरों की खोज एक ही स्वायत्त यात्रा मंच के माध्यम से करें।',
    'hero.cta_plan': 'यात्रा की योजना बनाएं',
    'hero.cta_explore': 'स्थान देखें',
    'hero.search_placeholder': 'आप कहाँ जाना चाहते हैं? (उदा. ऋषिकेश में राफ्टिंग)',

    // Sections
    'sec.featured_dest': 'प्रमुख गंतव्य स्थल',
    'sec.featured_dest_sub': 'सुरक्षित और प्रमाणित पर्यटन स्थलों का चयन',
    'sec.top_adventures': 'रोमांचक अभियान',
    'sec.top_adventures_sub': 'प्रमाणित उपकरण, बचाव दल और अनुभवी गाइड',
    'sec.stays_title': 'नदी किनारे और वन्य रिसॉर्ट्स',
    'sec.stays_sub': 'इको-लॉज, होमस्टे और कैंप्स',

    // Common
    'btn.book_now': 'अभी बुक करें',
    'btn.view_details': 'विवरण देखें',
    'btn.start_planning': 'योजना शुरू करें',
    'label.per_person': '/ प्रति व्यक्ति',
    'label.per_night': '/ प्रति रात',
    'label.difficulty': 'कठिनाई स्तर',
    'label.duration': 'अवधि',
    'label.readiness': 'तैयारी स्कोर',
  },

  'hi-en': {
    // Nav
    'nav.explore': 'Explore Karo',
    'nav.adventures': 'Adventures',
    'nav.stays': 'Stays & Camps',
    'nav.experiences': 'Experiences',
    'nav.trips': 'Trip Plan Banao',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.search': 'Search',
    'nav.admin': 'Admin Panel',

    // Hero
    'hero.badge': 'INDIA KA INTELLIGENT TRAVEL ECOSYSTEM',
    'hero.title_pre': 'TRAVEL SMARTER.',
    'hero.title_post': 'DESH KO JAANO.',
    'hero.desc': 'Real adventures, certified guides aur verified stays book karo bina kisi hidden fees ke.',
    'hero.cta_plan': 'Itinerary Banao',
    'hero.cta_explore': 'Destinations Dekho',
    'hero.search_placeholder': 'Kahan travel karna hai? (e.g. Rishikesh rafting ya Manali trek)',

    // Sections
    'sec.featured_dest': 'Trending Destinations',
    'sec.featured_dest_sub': 'Verified spots with 100% safety guidelines',
    'sec.top_adventures': 'Full Adrenaline Adventures',
    'sec.top_adventures_sub': 'Certified river & mountain instructors ke saath',
    'sec.stays_title': 'Best Stays & Riverside Camps',
    'sec.stays_sub': 'Top-rated homestays aur luxury glamping',

    // Common
    'btn.book_now': 'Book Karo',
    'btn.view_details': 'Details Dekho',
    'btn.start_planning': 'Plan Start Karo',
    'label.per_person': '/ person',
    'label.per_night': '/ night',
    'label.difficulty': 'Difficulty Level',
    'label.duration': 'Duration',
    'label.readiness': 'Trip Readiness',
  },
};

export function convertAndFormatPrice(amountInInr: number, currency: CurrencyCode): string {
  const meta = CURRENCIES[currency] || CURRENCIES.INR;
  if (currency === 'INR') {
    return `${meta.symbol}${amountInInr.toLocaleString('en-IN')}`;
  }

  const converted = Math.round(amountInInr * meta.rateFromInr * 100) / 100;
  return `${meta.symbol}${converted.toLocaleString(meta.locale, {
    minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
