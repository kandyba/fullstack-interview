import React, { useState, useEffect } from 'react';
import { Code, FileQuestion } from 'lucide-react';
import { findTopicById } from '../data/topics';
import { parseHTMLContent } from '../utils/htmlParser';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/TasksView.css';

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
        const response = await fetch(`/${jsPracticeTopic.file}`);
        const html = await response.text();
        const parsed = parseHTMLContent(html);
        
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
      <div className="tasks-view">
        <div className="tasks-loading">
          <Code size={48} />
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-view">
      <div className="tasks-header">
        <div className="tasks-title-section">
          <Code size={40} className="tasks-icon" />
          <div>
            <h1>💻 JS Practice</h1>
            <p className="tasks-subtitle">Практичні завдання для підготовки до співбесіди</p>
          </div>
        </div>
        <span className="tasks-count">
          {tasks.length} {t('questionsCount')}
        </span>
      </div>

      <div className="tasks-list">
        {tasks.map((task, index) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <div className="task-number-badge">
                <Code size={20} />
                <span>#{index + 1}</span>
              </div>
              <h3 className="task-question" dangerouslySetInnerHTML={{ __html: task.question }} />
            </div>
            <div className="task-content" dangerouslySetInnerHTML={{ __html: task.answer }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksView;
