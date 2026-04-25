import React, { useState, useEffect } from 'react';
import { Code } from 'lucide-react';
import { findTopicById } from '../data/topics';
import { loadTopicContent } from '../services/contentService';
import { useLanguage } from '../contexts/LanguageContext';

const TasksView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadTasks = async () => {
      const jsPracticeTopic = findTopicById('js-practice');
      
      if (!jsPracticeTopic || !jsPracticeTopic.file) {
        setLoading(false);
        return;
      }

      try {
        const parsed = await loadTopicContent(jsPracticeTopic);
        
        setTasks(parsed.questions);
        setLoading(false);
      } catch (error) {
        console.error('Error loading JS Practice tasks:', error);
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <Code size={48} />
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-4 py-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <Code size={36} className="text-violet-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">💻 JS Practice</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Практичні завдання для підготовки до співбесіди</p>
          </div>
        </div>
        <span className="rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 px-4 py-1.5 text-xs font-semibold text-white shadow">
          {tasks.length} {t('questionsCount')}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {tasks.map((task, index) => (
          <div key={task.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 flex items-start gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                <Code size={20} />
                <span>#{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold leading-7 text-slate-900 dark:text-slate-100" dangerouslySetInnerHTML={{ __html: task.question }} />
            </div>
            <div className="content-prose text-[15px] text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: task.answer }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksView;
