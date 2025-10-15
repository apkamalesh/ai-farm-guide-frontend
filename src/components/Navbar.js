import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        ☰
      </button>
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
      
      <nav className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="brand" onClick={closeMobileMenu}>AI Farm Guide</Link>
        </div>
        
        <div className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMobileMenu}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">{t('home')}</span>
          </NavLink>

          <NavLink to="/ai" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMobileMenu}>
            <span className="nav-icon">🤖</span>
            <span className="nav-text">{t('speakWithAi')}</span>
          </NavLink>

          

          <NavLink to="/market-price" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMobileMenu}>
            <span className="nav-icon">📈</span>
            <span className="nav-text">{t('MarketPrice')}</span>
          </NavLink>

          <NavLink to="/rates" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMobileMenu}>
            <span className="nav-icon">💰</span>
            <span className="nav-text">{t('rates')}</span>
          </NavLink>
        <NavLink to="/market" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMobileMenu}>
          <span className="nav-icon">📝</span>
          <span className="nav-text">{t('addProduct')}</span>
        </NavLink>
        </div>
        
        <div className="sidebar-footer">
          <div className="language-section">
            <label className="lang-label">{t('language')}:</label>
            <div className="lang-buttons">
              <button
                className={`lang-btn ${language === 'en' ? 'selected' : ''}`}
                onClick={() => setLanguage('en')}
              >{t('english')}</button>
              <button
                className={`lang-btn ${language === 'ta' ? 'selected' : ''}`}
                onClick={() => setLanguage('ta')}
              >{t('tamil')}</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;


