import React, { useState, useMemo, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import ContentArea from './ContentArea';
import { topics, findTopicById } from '../data/topics';
import { useHTMLContent, useSearch } from '../hooks/useContent';
import { searchInContent } from '../services/contentService';

const Dashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  // Встановлюємо темну тему приMount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
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

  const handleSelectTopic = (topicOrId) => {
    // Якщо передали id (string), знайти topic
    const topic = typeof topicOrId === 'string' 
      ? findTopicById(topicOrId) 
      : topicOrId;
    
    setSelectedTopic(topic);
    setSearchTerm('');
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100 md:text-xl">
            <svg className="h-7 w-7 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Interview<span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Pro</span></span>
          </h1>
        </div>
        
        <div>
          <button
            className="rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <Sidebar
            topics={topics}
            selectedTopic={selectedTopic}
            onSelectTopic={handleSelectTopic}
          />
        )}

        <main className="flex flex-1 flex-col bg-slate-50 dark:bg-slate-950">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultsCount={filteredContent?.questions?.length || 0}
          />
          
          <ContentArea
            content={filteredContent}
            loading={loading}
            error={error}
            searchTerm={debouncedTerm}
            currentTopicId={selectedTopic?.id}
            onTopicChange={handleSelectTopic}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
