import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './AiChat.css';

const CHAT_URL = 'https://mini-s6-9ldt.onrender.com/';

function AiChat() {
  const { t } = useLanguage();
  return (
    <div className="ai">
      <div className="ai-hero">
        <h2>{t('speakWithAi')}</h2>
        <p>AI assistant for farming guidance</p>
      </div>
      <iframe title="AI Chat" src={CHAT_URL} className="ai-frame" />
    </div>
  );
}

export default AiChat;


