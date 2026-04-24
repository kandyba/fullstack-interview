import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getNextTopic, getPreviousTopic } from '../data/topics';

const TopicNavigation = ({ currentTopicId, onNavigate }) => {
  const previousTopic = getPreviousTopic(currentTopicId);
  const nextTopic = getNextTopic(currentTopicId);

  if (!previousTopic && !nextTopic) return null;

  return (
    <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 md:grid-cols-2">
      {previousTopic ? (
        <button 
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow dark:border-slate-700 dark:bg-slate-900"
          onClick={() => onNavigate(previousTopic.id)}
        >
          <ChevronLeft size={20} className="text-emerald-500" />
          <div>
            <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Попередня тема</span>
            <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{previousTopic.title}</span>
          </div>
        </button>
      ) : (
        <div></div>
      )}

      {nextTopic ? (
        <button 
          className="flex items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow dark:border-slate-700 dark:bg-slate-900"
          onClick={() => onNavigate(nextTopic.id)}
        >
          <div>
            <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Наступна тема</span>
            <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{nextTopic.title}</span>
          </div>
          <ChevronRight size={20} className="text-emerald-500" />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TopicNavigation;
