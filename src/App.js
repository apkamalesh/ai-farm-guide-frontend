import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AiChat from './pages/AiChat';
import Rates from './pages/Rates';
import Market from './pages/Market';
import MarketPrice from './pages/MarketPrice';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="app-shell">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai" element={<AiChat />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/market" element={<Market />} />
            <Route path="/market-price" element={<MarketPrice />} />
          </Routes>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
