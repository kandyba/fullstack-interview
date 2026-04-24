import React, { useState, useMemo, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import ContentArea from './ContentArea';
import { topics, findTopicById } from '../data/topics';
import { useHTMLContent, useSearch } from '../hooks/useContent';
import { searchInContent } from '../utils/htmlParser';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  // Встановлюємо темну тему приMount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);
  
  const { content, loading, error } = useHTMLContent(selectedTopic?.file);
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
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <header className="dashboard-header">
        <div className="header-left">
          <button
            className="toggle-sidebar-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="dashboard-title">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">Interview<span className="logo-accent">Pro</span></span>
          </h1>
        </div>
        
        <div className="header-right">
          <button
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        {sidebarOpen && (
          <Sidebar
            topics={topics}
            selectedTopic={selectedTopic}
            onSelectTopic={handleSelectTopic}
          />
        )}

        <main className="main-content">
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
