import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronRight, BookOpen } from 'lucide-react';
import { learningRoadMap, findTopicById } from '../data/topics';
import { loadProgress, markTopicCompleted, unmarkTopicCompleted } from '../utils/progress';
import { useLanguage } from '../contexts/LanguageContext';

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
    <div className="mx-auto mb-10 max-w-5xl px-0 md:px-2">
      <div className="mb-8">
        <div className="mb-5 flex items-start gap-3">
          <BookOpen size={26} className="mt-1 text-emerald-500" />
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 md:text-3xl">{t('roadmap') || 'Learning Road Map'}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">
              {t('roadmapSubtitle') || 'Структурований шлях від Junior до Senior розробника'}
            </p>
          </div>
        </div>
        
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {totalProgress.completed} / {totalProgress.total}
            </span>
            <span className="text-2xl font-bold text-emerald-500">{totalProgress.percentage}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div 
              className="h-full rounded-full bg-linear-to-r from-emerald-500 to-teal-400 transition-all"
              style={{ width: `${totalProgress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedTopics).map(([level, items]) => {
          if (items.length === 0) return null;
          
          const progress = calculateLevelProgress(items);
          const isExpanded = expandedLevel === level;
          const levelColor = levelColors[level];

          return (
            <div key={level} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow dark:border-slate-700 dark:bg-slate-900">
              <button
                className={`flex w-full items-center gap-3 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/40 ${isExpanded ? 'border-b border-slate-200 dark:border-slate-700' : ''}`}
                onClick={() => setExpandedLevel(isExpanded ? null : level)}
                style={{ '--level-color': levelColor }}
              >
                <div className="flex min-w-40 items-center gap-2">
                  <span className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white" style={{ backgroundColor: levelColor }}>
                    {level}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {progress.completed} / {progress.total} {t('topics') || 'тем'}
                  </span>
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${progress.percentage}%`,
                      backgroundColor: levelColor
                    }}
                  />
                </div>
                <ChevronRight 
                  size={20} 
                  className={`shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${isExpanded ? 'rotate-90' : ''}`} 
                />
              </button>

              {isExpanded && (
                <div className="space-y-1 p-2">
                  {items.map((roadItem, index) => {
                    const topic = findTopicById(roadItem.id);
                    const isCompleted = completedTopics.includes(roadItem.id);
                    
                    return (
                      <div
                        key={roadItem.id}
                        className={`flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-800/40 ${isCompleted ? 'opacity-70' : ''}`}
                      >
                        <button
                          className="text-slate-400 transition hover:scale-105 hover:text-emerald-500 dark:text-slate-500"
                          onClick={(e) => toggleComplete(roadItem.id, e)}
                          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={20} className="text-emerald-500" />
                          ) : (
                            <Circle size={20} />
                          )}
                        </button>

                        <button
                          className="flex flex-1 items-center gap-2 rounded-md px-2 py-1 text-left transition hover:translate-x-1 hover:bg-white dark:hover:bg-slate-900"
                          onClick={() => topic && onSelectTopic(topic)}
                          disabled={!topic}
                        >
                          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-slate-200 px-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{index + 1}</span>
                          <span className={`text-sm font-medium ${isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>{roadItem.title}</span>
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
