import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/NotFound.css';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <AlertCircle size={120} className="not-found-icon" />
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">
          {t('notFoundTitle') || 'Сторінку не знайдено'}
        </h2>
        <p className="not-found-description">
          {t('notFoundDescription') || 'Схоже, ви перейшли за неіснуючим посиланням.'}
        </p>
        <Link to="/" className="not-found-btn">
          <Home size={20} />
          {t('backToHome') || 'На головну'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
