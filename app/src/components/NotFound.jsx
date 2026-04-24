import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="max-w-xl text-center">
        <AlertCircle size={110} className="mx-auto animate-pulse text-emerald-500" />
        <h1 className="mt-4 text-8xl font-extrabold tracking-tight text-emerald-500 md:text-9xl">404</h1>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
          {t('notFoundTitle') || 'Сторінку не знайдено'}
        </h2>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-400 md:text-lg">
          {t('notFoundDescription') || 'Схоже, ви перейшли за неіснуючим посиланням.'}
        </p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-emerald-600">
          <Home size={20} />
          {t('backToHome') || 'На головну'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
