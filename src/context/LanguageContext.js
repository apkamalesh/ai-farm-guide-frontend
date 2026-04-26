import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key
});

const TRANSLATIONS = {
  en: {
    welcome: 'Welcome',
    userName: 'KAMALESH',
    news: 'News',
    farmingNews: 'Farming & Agriculture Highlights',
    speakWithAi: 'Speak with AI',
    goToChat: 'Open AI Chat',
    rates: 'Market Products',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    flowers: 'Flowers',
    market: 'Market',
    addProduct: 'Add Product',
    viewProducts: 'View Products',
    name: 'Name',
    farmerName: 'Farmer Name',
    state: 'State',
    selectState: 'Select State',
    city: 'City',
    selectCity: 'Select City',
    category: 'Category',
    selectCategory: 'Select Category',
    phone: 'Phone',
    farmerPhone: 'Farmer Phone',
    product: 'Product',
    selectProduct: 'Select Product',
    quantityKgs: 'Quantity (Kgs)',
    price: 'Price',
    pricePerKg: 'Price (Per Kg)',
    submit: 'Submit',
    noProducts: 'No products yet. Be the first to add!',
    language: 'Language',
    english: 'English',
    tamil: 'Tamil',
    home: 'Home',
    sponsored: 'Sponsored',
    MarketPrice: 'Market Price'
  },
  ta: {
    welcome: 'வணக்கம்',
    userName: 'கமலேஷ்',
    news: 'செய்திகள்',
    farmingNews: 'விவசாயம் & வேளாண் முக்கிய செய்திகள்',
    speakWithAi: 'AI உடன் பேச',
    goToChat: 'AI அரட்டைக்கு செல்ல',
    rates: 'சந்தை பொருட்கள்',
    vegetables: 'காய்கறிகள்',
    fruits: 'பழங்கள்',
    flowers: 'மலர்கள்',
    market: 'மார்க்கெட்',
    addProduct: 'பொருள் சேர்க்க',
    viewProducts: 'பொருட்கள் பார்க்க',
    name: 'பெயர்',
    farmerName: 'விவசாயி பெயர்',
    state: 'மாநிலம்',
    selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    city: 'நகரம்',
    selectCity: 'நகரத்தைத் தேர்ந்தெடுக்கவும்',
    category: 'வகை',
    selectCategory: 'வகையைத் தேர்ந்தெடுக்கவும்',
    phone: 'தொலைபேசி',
    farmerPhone: 'விவசாயி தொலைபேசி',
    product: 'பொருள்',
    selectProduct: 'பொருளைத் தேர்ந்தெடுக்கவும்',
    quantityKgs: 'அளவு (கிலோ)',
    price: 'விலை',
    pricePerKg: 'விலை (ஒரு கிலோ)',
    submit: 'சமர்ப்பிக்க',
    noProducts: 'இன்னும் பொருட்கள் இல்லை. முதலில் நீங்கள் சேர்க்கவும்!',
    language: 'மொழி',
    english: 'ஆங்கிலம்',
    tamil: 'தமிழ்',
    home: 'முகப்பு',
    sponsored: 'விளம்பரம்',
    MarketPrice: 'சந்தை விலை'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    return saved === 'ta' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('lang', language);
    } catch (e) {
      console.error("Local storage not available");
    }
  }, [language]);

  const t = useMemo(() => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return (key) => dict[key] ?? key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}