import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getNextTopic, getPreviousTopic } from '../data/topics';
import '../styles/TopicNavigation.css';

const TopicNavigation = ({ currentTopicId, onNavigate }) => {
  const previousTopic = getPreviousTopic(currentTopicId);
  const nextTopic = getNextTopic(currentTopicId);

  if (!previousTopic && !nextTopic) return null;

  return (
    <div className="topic-navigation">
      {previousTopic ? (
        <button 
          className="nav-button nav-previous"
          onClick={() => onNavigate(previousTopic.id)}
        >
          <ChevronLeft size={20} />
          <div className="nav-content">
            <span className="nav-label">Попередня тема</span>
            <span className="nav-title">{previousTopic.title}</span>
          </div>
        </button>
      ) : (
        <div className="nav-spacer"></div>
      )}

      {nextTopic ? (
        <button 
          className="nav-button nav-next"
          onClick={() => onNavigate(nextTopic.id)}
        >
          <div className="nav-content">
            <span className="nav-label">Наступна тема</span>
            <span className="nav-title">{nextTopic.title}</span>
          </div>
          <ChevronRight size={20} />
        </button>
      ) : (
        <div className="nav-spacer"></div>
      )}
    </div>
  );
};

export default TopicNavigation;
