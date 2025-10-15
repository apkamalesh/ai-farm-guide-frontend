import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import MarketPrice from '../pages/MarketPrice';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key
});

const TRANSLATIONS = {
  en: {
    welcome: 'Welcome',
    userName: 'ARUN',
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
    city: 'City',
    phone: 'Phone',
    product: 'Product',
    price: 'Price',
    submit: 'Submit',
    noProducts: 'No products yet. Be the first to add!',
    language: 'Language',
    english: 'English',
    tamil: 'Tamil',
    home: 'Home',
    sponsored: 'Sponsored',
    MarketPrice:'Market Price'
  },
  ta: {
    welcome: 'வணக்கம்',
    userName: 'அருண்',
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
    city: 'நகரம்',
    phone: 'தொலைபேசி',
    product: 'பொருள்',
    price: 'விலை',
    submit: 'சமர்ப்பிக்க',
    noProducts: 'இன்னும் பொருட்கள் இல்லை. முதலில் நீங்கள் சேர்க்கவும்!',
    language: 'மொழி',
    english: 'ஆங்கிலம்',
    tamil: 'தமிழ்',
    home: 'முகப்பு',
    sponsored: 'விளம்பரம்',
    MarketPrice:'சந்தை விலை'
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
    } catch {}
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


