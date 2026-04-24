import React from 'react';
import { getAllLeafTopics } from '../data/topics';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/TopNavBar.css';

const TopNavBar = ({ selectedTopic, onSelectTopic, onShowFavorites, showingFavorites }) => {
  const allTopics = getAllLeafTopics();
  const { t } = useLanguage();

  const getLevelBadgeClass = (level) => {
    if (!level) return '';
    if (level.includes('Junior')) return 'level-junior';
    if (level === 'Middle') return 'level-middle';
    if (level === 'Senior') return 'level-senior';
    if (level.includes('Middle') && level.includes('Senior')) return 'level-middle-senior';
    return 'level-all';
  };

  return (
    <div className="top-nav-bar">
      <div className="nav-tabs-wrapper">
        <div className="nav-tabs">
          <button
            className={`nav-tab favorites-tab ${showingFavorites ? 'active' : ''}`}
            onClick={onShowFavorites}
          >
            {t('saved')}
          </button>

          <div className="nav-divider"></div>

          {allTopics.map((topic) => (
            <button
              key={topic.id}
              className={`nav-tab topic-tab ${selectedTopic?.id === topic.id ? 'active' : ''}`}
              onClick={() => onSelectTopic(topic)}
              title={`${topic.title}${topic.level ? ` (${topic.level})` : ''}`}
            >
              {topic.icon && <span className="tab-icon">{topic.icon}</span>}
              <span className="tab-title">{topic.title}</span>
              {topic.level && (
                <span className={`level-badge ${getLevelBadgeClass(topic.level)}`}>
                  {topic.level}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
