import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronRight, BookOpen } from 'lucide-react';
import { learningRoadMap, findTopicById } from '../data/topics';
import { loadProgress, markTopicCompleted, unmarkTopicCompleted } from '../utils/progress';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/RoadMapProgress.css';

const RoadMapProgress = ({ onSelectTopic }) => {
  const [completedTopics, setCompletedTopics] = useState([]);
  const [expandedLevel, setExpandedLevel] = useState('Junior');
  const { t } = useLanguage();

  useEffect(() => {
    setCompletedTopics(loadProgress());
  }, []);

  const toggleComplete = (topicId, e) => {
    e.stopPropagation();
    if (completedTopics.includes(topicId)) {
      const updated = unmarkTopicCompleted(topicId);
      setCompletedTopics(updated);
    } else {
      const updated = markTopicCompleted(topicId);
      setCompletedTopics(updated);
    }
  };

  const groupByLevel = () => {
    const groups = {
      'Junior': [],
      'Middle': [],
      'Senior': [],
      'Additional': []
    };

    learningRoadMap.forEach(item => {
      if (item.order >= 100) {
        groups['Additional'].push(item);
      } else if (item.level === 'Junior') {
        groups['Junior'].push(item);
      } else if (item.level === 'Middle') {
        groups['Middle'].push(item);
      } else if (item.level === 'Senior') {
        groups['Senior'].push(item);
      }
    });

    return groups;
  };

  const calculateLevelProgress = (items) => {
    const completed = items.filter(item => completedTopics.includes(item.id)).length;
    return {
      completed,
      total: items.length,
      percentage: Math.round((completed / items.length) * 100)
    };
  };

  const groupedTopics = groupByLevel();
  const mainTopics = learningRoadMap.filter(item => item.order < 100);
  const totalProgress = calculateLevelProgress(mainTopics);

  const levelColors = {
    'Junior': '#22c55e',
    'Middle': '#3b82f6',
    'Senior': '#a855f7',
    'Additional': '#94a3b8'
  };

  return (
    <div className="roadmap-progress">
      <div className="roadmap-header">
        <div className="roadmap-title-section">
          <BookOpen size={28} className="roadmap-icon" />
          <div>
            <h2 className="roadmap-title">{t('roadmap') || 'Learning Road Map'}</h2>
            <p className="roadmap-subtitle">
              {t('roadmapSubtitle') || 'Структурований шлях від Junior до Senior розробника'}
            </p>
          </div>
        </div>
        
        <div className="roadmap-total-progress">
          <div className="progress-stats">
            <span className="progress-count">
              {totalProgress.completed} / {totalProgress.total}
            </span>
            <span className="progress-percentage">{totalProgress.percentage}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{ width: `${totalProgress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="roadmap-levels">
        {Object.entries(groupedTopics).map(([level, items]) => {
          if (items.length === 0) return null;
          
          const progress = calculateLevelProgress(items);
          const isExpanded = expandedLevel === level;
          const levelColor = levelColors[level];

          return (
            <div key={level} className="roadmap-level">
              <button
                className={`level-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setExpandedLevel(isExpanded ? null : level)}
                style={{ '--level-color': levelColor }}
              >
                <div className="level-info">
                  <span className="level-badge" style={{ backgroundColor: levelColor }}>
                    {level}
                  </span>
                  <span className="level-progress-text">
                    {progress.completed} / {progress.total} {t('topics') || 'тем'}
                  </span>
                </div>
                <div className="level-progress-bar">
                  <div 
                    className="level-progress-fill"
                    style={{ 
                      width: `${progress.percentage}%`,
                      backgroundColor: levelColor
                    }}
                  />
                </div>
                <ChevronRight 
                  size={20} 
                  className={`level-chevron ${isExpanded ? 'rotated' : ''}`} 
                />
              </button>

              {isExpanded && (
                <div className="level-topics">
                  {items.map((roadItem, index) => {
                    const topic = findTopicById(roadItem.id);
                    const isCompleted = completedTopics.includes(roadItem.id);
                    
                    return (
                      <div
                        key={roadItem.id}
                        className={`roadmap-topic ${isCompleted ? 'completed' : ''}`}
                      >
                        <button
                          className="topic-checkbox"
                          onClick={(e) => toggleComplete(roadItem.id, e)}
                          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={20} className="check-icon" />
                          ) : (
                            <Circle size={20} className="circle-icon" />
                          )}
                        </button>

                        <button
                          className="topic-link"
                          onClick={() => topic && onSelectTopic(topic)}
                          disabled={!topic}
                        >
                          <span className="topic-number">{index + 1}</span>
                          <span className="topic-title">{roadItem.title}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadMapProgress;
