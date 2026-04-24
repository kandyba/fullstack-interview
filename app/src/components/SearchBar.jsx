import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, FileQuestion } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  resultsCount,
  topicSuggestions = [],
  questionSuggestions = [],
  onSelectTopicSuggestion,
  onSelectQuestionSuggestion,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const allSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const combined = [];
    
    // Add question suggestions first (max 3)
    if (questionSuggestions.length > 0) {
      combined.push(...questionSuggestions.slice(0, 3).map(q => ({ ...q, type: 'question' })));
    }
    
    // Add topic suggestions (max 5 remaining)
    if (topicSuggestions.length > 0) {
      combined.push(...topicSuggestions.slice(0, 5).map(t => ({ ...t, type: 'topic' })));
    }
    
    return combined.slice(0, 8);
  }, [searchTerm, topicSuggestions, questionSuggestions]);

  useEffect(() => {
    const onDocClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const handleSelectSuggestion = (suggestion) => {
    if (suggestion.type === 'question') {
      if (onSelectQuestionSuggestion) {
        onSelectQuestionSuggestion(suggestion);
      }
    } else {
      if (onSelectTopicSuggestion) {
        onSelectTopicSuggestion(suggestion);
      }
    }
    onSearchChange('');
    setIsOpen(false);
  };
  
  return (
    <div ref={rootRef} className="w-full">
      <div className="relative mx-auto flex w-full max-w-2xl flex-col">
        <div className="relative flex items-center">
          <Search size={18} className="pointer-events-none absolute left-3.5 text-emerald-500" />
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-900"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          {searchTerm && (
            <button
              className="absolute right-2 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              onClick={() => {
                onSearchChange('');
                setIsOpen(false);
              }}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Fixed-height container for results count - prevents jumping */}
        <div className="h-5">
          {searchTerm && resultsCount > 0 && (
            <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              {resultsCount} {t('searchResults')}
            </div>
          )}
        </div>

        {/* Absolute-positioned dropdown */}
        {isOpen && allSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <ul className="max-h-72 overflow-y-auto py-1">
              {allSuggestions.map((suggestion, idx) => (
                <li key={`${suggestion.type}-${suggestion.id}-${idx}`}>
                  <button
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                      suggestion.type === 'question'
                        ? 'border-l-2 border-opacity-50 border-blue-500 text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800'
                        : 'border-l-2 border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.type === 'question' ? (
                      <>
                        <FileQuestion size={16} className="shrink-0 text-blue-500" />
                        <span className="truncate text-sm">{suggestion.question}</span>
                      </>
                    ) : (
                      <>
                        <span className="shrink-0">{suggestion.icon || '📚'}</span>
                        <span className="truncate">{suggestion.title}</span>
                        <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {suggestion.level || 'topic'}
                        </span>
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
