import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SearchBar = ({ searchTerm, onSearchChange, resultsCount }) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full">
      <div className="relative mx-auto flex w-full max-w-2xl items-center">
        <Search size={18} className="pointer-events-none absolute left-3.5 text-emerald-500" />
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-900"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute right-2 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="mt-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
          {resultsCount} {t('searchResults')}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
