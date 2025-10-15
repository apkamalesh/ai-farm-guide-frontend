import React, { useMemo, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

const SAMPLE_NEWS = [
  {
    id: 1,
    title_en: 'Monsoon rains boost paddy sowing across Tamil Nadu',
    title_ta: 'தமிழ்நாட்டில் பருவமழை காரணமாக நெல் விதைப்பு வேகமாகிறது',
    link: 'https://www.hindustantimes.com/world-news/us-news/old-farmers-almanac-weather-predictions-accurate-thanksgiving-travel-forecast-raises-questions-101760037820437.html',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop',
    category: 'Weather & Farming'
  },
  {
    id: 2,
    title_en: 'Govt announces MSP hike for key crops',
    title_ta: 'அரசு முக்கிய பயிர்களுக்கு குறைந்தபட்ச ஆதரவு விலையை உயர்த்தியது',
    link: '@https://www.thehindu.com/news/cities/Madurai/tamil-nadu-should-take-steps-to-prevent-farmers-suicide/article70158533.ece',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=400&auto=format&fit=crop',
    category: 'Government Policy'
  },
  {
    id: 3,
    title_en: 'Tips to control fall armyworm in maize',
    title_ta: 'சோளத்தில் படைபூச்சியை கட்டுப்படுத்தும் குறிப்புகள்',
    link: 'https://www.indianchemicalnews.com/chemical/corteva-refines-insecticide-delegate-to-advance-precise-pest-control-for-corn-cotton-and-chilli-farmers-in-india-27786',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=400&auto=format&fit=crop',
    category: 'Pest Control'
  }
];

function Home() {
  const { language, t } = useLanguage();
  const welcomeText = useMemo(() => `${t('welcome')} ${t('userName')}` , [t]);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating && currentIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + welcomeText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    } else if (currentIndex >= welcomeText.length) {
      setIsAnimating(false);
    }
  }, [currentIndex, welcomeText, isAnimating]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsAnimating(true);
  }, [welcomeText]);

  const news = SAMPLE_NEWS.map(n => ({
    id: n.id,
    title: language === 'ta' ? n.title_ta : n.title_en,
    link: n.link,
    image: n.image,
    category: n.category
  }));

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            {displayText}
            {isAnimating && <span className="cursor">|</span>}
          </h1>
          <p>{t('farmingNews')}</p>
        </div>
      </div>

      <div className="news-section">
        <div className="news-header">
          <h2>📰 {t('news')}</h2>
        </div>
        <div className="news-grid">
          {news.map(item => (
            <div key={item.id} className="news-card">
              <div className="news-image">
                <img src={item.image} alt={item.title} />
                <div className="news-category">{item.category}</div>
              </div>
              <div className="news-content">
                <h3>{item.title}</h3>
                <a href={item.link} className="news-link">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;


