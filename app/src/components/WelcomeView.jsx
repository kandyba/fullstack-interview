import React, { useState, useEffect } from 'react';
import { FileQuestion, Code, FolderTree } from 'lucide-react';
import { getAllLeafTopics } from '../data/topics';
import { parseHTMLContent } from '../utils/htmlParser';
import { useLanguage } from '../contexts/LanguageContext';
import RoadMapProgress from './RoadMapProgress';

const WelcomeView = ({ onSelectTopic }) => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalTopics: 0,
    practicalTasks: 0,
    loading: true
  });
  const { t } = useLanguage();

  useEffect(() => {
    const calculateStats = async () => {
      const allTopics = getAllLeafTopics();
      let questionCount = 0;
      let tasksCount = 0;

      for (const topic of allTopics) {
        if (!topic.file) continue;

        try {
          const parsed = await parseHTMLContent(topic.file);
          
          if (topic.questionRange) {
            const [start, end] = topic.questionRange;
            const rangeCount = Math.max(0, Math.min(end, parsed.questions.length) - start);
            questionCount += rangeCount;
          } else {
            questionCount += parsed.questions.length;
          }
          
          // Підрахунок практичних завдань (теми з "practice" в id)
          if (topic.id.includes('practice') || topic.title.toLowerCase().includes('practice')) {
            tasksCount += parsed.questions.length;
          }
        } catch (error) {
          console.error(`Error loading ${topic.title}:`, error);
        }
      }

      setStats({
        totalQuestions: questionCount,
        totalTopics: allTopics.length,
        practicalTasks: tasksCount,
        loading: false
      });
    };

    calculateStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">{t('welcomeTitle')}</h1>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-400 md:text-lg">{t('welcomeSubtitle')}</p>
      </div>

      <RoadMapProgress onSelectTopic={onSelectTopic} />

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
            <FileQuestion size={48} />
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{stats.totalQuestions}</div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('totalQuestions')}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="rounded-2xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
            <FolderTree size={48} />
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{stats.totalTopics}</div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('totalTopics')}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="rounded-2xl bg-violet-100 p-3 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
            <Code size={48} />
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{stats.practicalTasks}</div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('practicalTasks')}</div>
          </div>
        </div>
      </div>

      <div className="text-center text-slate-500 dark:text-slate-400">
        <p>💡 {t('selectTopic')}</p>
      </div>
    </div>
  );
};

export default WelcomeView;
