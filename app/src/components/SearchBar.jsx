import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, resultsCount }) => {
  const { t } = useLanguage();
  
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="clear-button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-results-info">
          {resultsCount} {t('searchResults')}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
