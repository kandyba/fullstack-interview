import React, { useState, useEffect } from 'react';
import { FileQuestion, Code, FolderTree } from 'lucide-react';
import { getAllLeafTopics } from '../data/topics';
import { parseHTMLContent } from '../utils/htmlParser';
import { useLanguage } from '../contexts/LanguageContext';
import RoadMapProgress from './RoadMapProgress';
import '../styles/WelcomeView.css';

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
          const response = await fetch(`/${topic.file}`);
          const html = await response.text();
          const parsed = await parseHTMLContent(html);
          
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
      <div className="welcome-view">
        <div className="welcome-loading">
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-view">
      <div className="welcome-header">
        <h1 className="welcome-title">{t('welcomeTitle')}</h1>
        <p className="welcome-subtitle">{t('welcomeSubtitle')}</p>
      </div>

      <RoadMapProgress onSelectTopic={onSelectTopic} />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon questions-icon">
            <FileQuestion size={48} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalQuestions}</div>
            <div className="stat-label">{t('totalQuestions')}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon topics-icon">
            <FolderTree size={48} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalTopics}</div>
            <div className="stat-label">{t('totalTopics')}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon tasks-icon">
            <Code size={48} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.practicalTasks}</div>
            <div className="stat-label">{t('practicalTasks')}</div>
          </div>
        </div>
      </div>

      <div className="welcome-hint">
        <p>💡 {t('selectTopic')}</p>
      </div>
    </div>
  );
};

export default WelcomeView;
