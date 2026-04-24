import React, { useState, useMemo } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import TopNavBar from './TopNavBar';
import SearchBar from './SearchBar';
import ContentArea from './ContentArea';
import FavoritesView from './FavoritesView';
import WelcomeView from './WelcomeView';
import { useHTMLContent, useSearch } from '../hooks/useContent';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useTheme } from '../hooks/useTheme';
import { searchInContent } from '../utils/htmlParser';
import { getAllLeafTopics, findTopicById } from '../data/topics';
import { useLanguage } from '../contexts/LanguageContext';

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

  const topicSuggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    return getAllLeafTopics()
      .filter((topic) => {
        const haystack = `${topic.title} ${topic.level || ''} ${topic.id}`.toLowerCase();
        return haystack.includes(term);
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [searchTerm]);

  // Generate question suggestions from filtered content
  const questionSuggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term || !filteredContent?.questions) return [];

    return filteredContent.questions
      .filter((q) => q.question.toLowerCase().includes(term))
      .slice(0, 5)
      .map((q) => ({
        ...q,
        topicId: selectedTopic?.id,
      }));
  }, [searchTerm, filteredContent, selectedTopic]);

  // Handle question suggestion click - navigate to topic and scroll to question
  const handleSelectQuestionSuggestion = (question) => {
    if (question.topicId) {
      // Ensure we're on the topic
      if (selectedTopic?.id !== question.topicId) {
        handleSelectTopic(findTopicById(question.topicId));
      }
      
      // Scroll to question after a brief delay to ensure DOM is updated
      setTimeout(() => {
        const questionElement = document.getElementById(`question-${question.id}`);
        if (questionElement) {
          questionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Optional: add highlight effect
          questionElement.classList.add('ring-2', 'ring-emerald-400', 'rounded-2xl');
          setTimeout(() => {
            questionElement.classList.remove('ring-2', 'ring-emerald-400', 'rounded-2xl');
          }, 2000);
        }
      }, 100);
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto grid w-full max-w-450 grid-cols-1 gap-3 px-4 py-3 md:grid-cols-[1fr_2fr_1fr] md:items-center md:gap-6 md:px-6">
          <div className="flex items-center justify-between gap-4 md:justify-start md:gap-6">
            <h1 className="group flex cursor-pointer items-center gap-2 text-xl font-bold md:text-2xl" onClick={() => handleSelectTopic(null)}>
              <svg className="h-7 w-7 text-emerald-500 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>
                Interview
                <span className="bg-linear-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Pro</span>
              </span>
            </h1>
            
            <div className="hidden rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-900 md:flex">
              <button
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  currentPage === 'questions'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
                onClick={() => handlePageChange('questions')}
              >
                {t('questionsPage')}
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  currentPage === 'tasks'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
                onClick={() => handlePageChange('tasks')}
              >
                {t('tasks')}
              </button>
            </div>
          </div>

          <div className="min-w-0">
            {!showingFavorites && (
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                resultsCount={filteredContent?.questions?.length || 0}
                topicSuggestions={topicSuggestions}
                questionSuggestions={questionSuggestions}
                onSelectTopicSuggestion={handleSelectTopic}
                onSelectQuestionSuggestion={handleSelectQuestionSuggestion}
              />
            )}
          </div>
          
          <div className="flex items-center justify-end gap-2 md:gap-3">
            <a
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300"
              href={feedbackUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('feedback')}
            </a>
            <div className="relative">
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                aria-label="Change language"
              >
                <Globe size={20} />
                <span className="text-xs font-semibold tracking-wide">{language.toUpperCase()}</span>
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 top-12 z-50 min-w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  <button
                    className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition ${
                      language === 'uk'
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => changeLanguage('uk')}
                  >
                    🇺🇦 Українська
                  </button>
                  <button
                    className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition ${
                      language === 'en'
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => changeLanguage('en')}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>
            
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300"
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

      <main className="mx-auto flex w-full max-w-450 flex-1 flex-col">
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
      </main>
    </div>
  );
};

export default App;
