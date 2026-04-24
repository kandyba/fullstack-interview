import React, { useState, useMemo } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import TopNavBar from './TopNavBar';
import SearchBar from './SearchBar';
import ContentArea from './ContentArea';
import FavoritesView from './FavoritesView';
import WelcomeView from './WelcomeView';
import TasksView from './TasksView';
import { useHTMLContent, useSearch } from '../hooks/useContent';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useTheme } from '../hooks/useTheme';
import { searchInContent } from '../utils/htmlParser';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/App.css';

const App = () => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const feedbackUrl = import.meta.env.VITE_FEEDBACK_URL || 'https://tally.so/';
  const { darkMode, toggleTheme } = useTheme('dark');
  const {
    selectedTopic,
    showingFavorites,
    favoritesRefresh,
    currentPage,
    handleSelectTopic,
    handleShowFavorites,
    handlePageChange
  } = useAppNavigation();
  
  const { content, loading, error } = useHTMLContent(selectedTopic);
  const { searchTerm, setSearchTerm, debouncedTerm } = useSearch();

  const filteredContent = useMemo(() => {
    if (!content || !debouncedTerm) return content;
    
    const filtered = searchInContent(content.questions, debouncedTerm);
    return {
      ...content,
      questions: filtered
    };
  }, [content, debouncedTerm]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-wrapper">
          <div className="header-left">
            <h1 className="app-title" onClick={() => handleSelectTopic(null)} style={{ cursor: 'pointer' }}>
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logo-text">Interview<span className="logo-accent">Pro</span></span>
            </h1>
            
            <div className="header-nav">
              <button
                className={`header-nav-btn ${currentPage === 'questions' ? 'active' : ''}`}
                onClick={() => handlePageChange('questions')}
              >
                {t('questionsPage')}
              </button>
              <button
                className={`header-nav-btn ${currentPage === 'tasks' ? 'active' : ''}`}
                onClick={() => handlePageChange('tasks')}
              >
                {t('tasks')}
              </button>
            </div>
          </div>

          <div className="header-center">
            {!showingFavorites && (
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                resultsCount={filteredContent?.questions?.length || 0}
              />
            )}
          </div>
          
          <div className="header-right">
            <a
              className="feedback-btn"
              href={feedbackUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('feedback')}
            </a>
            <div className="language-selector">
              <button
                className="language-toggle-btn"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                aria-label="Change language"
              >
                <Globe size={20} />
                <span className="current-lang">{language.toUpperCase()}</span>
              </button>
              {showLanguageMenu && (
                <div className="language-menu">
                  <button
                    className={`language-option ${language === 'uk' ? 'active' : ''}`}
                    onClick={() => changeLanguage('uk')}
                  >
                    🇺🇦 Українська
                  </button>
                  <button
                    className={`language-option ${language === 'en' ? 'active' : ''}`}
                    onClick={() => changeLanguage('en')}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>
            
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {currentPage === 'questions' && (
        <TopNavBar 
          selectedTopic={selectedTopic}
          onSelectTopic={handleSelectTopic}
          onShowFavorites={handleShowFavorites}
          showingFavorites={showingFavorites}
        />
      )}

      <main className="main-content">
        {currentPage === 'tasks' ? (
          <TasksView />
        ) : (
          <>
            {showingFavorites ? (
              <FavoritesView 
                onSelectTopic={handleSelectTopic} 
                refreshTrigger={favoritesRefresh}
              />
            ) : selectedTopic ? (
              <ContentArea
                content={filteredContent}
                loading={loading}
                error={error}
                searchTerm={debouncedTerm}
                currentTopicId={selectedTopic?.id}
                onTopicChange={handleSelectTopic}
                onShowFavorites={handleShowFavorites}
              />
            ) : (
              <WelcomeView onSelectTopic={handleSelectTopic} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
