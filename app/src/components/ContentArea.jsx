import React, { useState, useEffect } from 'react';
import { FileQuestion, Loader, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import TopicNavigation from './TopicNavigation';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';
import { getNextTopic, getPreviousTopic, findTopicById } from '../data/topics';
import { isTopicCompleted, markTopicCompleted, unmarkTopicCompleted } from '../utils/progress';
import '../styles/ContentArea.css';

const QuestionCard = ({ question, index, topicId, onShowFavorites }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(question.id, topicId));
  }, [question.id, topicId]);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(question.id, topicId);
      setIsFav(false);
    } else {
      addFavorite(question.id, topicId);
      setIsFav(true);
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">{index + 1}</span>
        <h3 className="question-text" dangerouslySetInnerHTML={{ __html: question.question }} />
        <button 
          className={`favorite-btn ${isFav ? 'favorited' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={20} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="answer-content" dangerouslySetInnerHTML={{ __html: question.answer }} />
    </div>
  );
};

const ContentArea = ({ content, loading, error, searchTerm, currentTopicId, onTopicChange, onShowFavorites }) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (currentTopicId) {
      setCompleted(isTopicCompleted(currentTopicId));
    }
  }, [currentTopicId]);

  const handleToggleComplete = () => {
    if (completed) {
      unmarkTopicCompleted(currentTopicId);
      setCompleted(false);
    } else {
      markTopicCompleted(currentTopicId);
      setCompleted(true);
    }
  };

  const handleNavigate = (direction) => {
    if (!currentTopicId) return;
    
    const topic = direction === 'next' 
      ? getNextTopic(currentTopicId)
      : getPreviousTopic(currentTopicId);
    
    if (topic) {
      const fullTopic = findTopicById(topic.id);
      if (fullTopic) {
        onTopicChange(fullTopic);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const nextTopic = currentTopicId ? getNextTopic(currentTopicId) : null;
  const prevTopic = currentTopicId ? getPreviousTopic(currentTopicId) : null;

  if (loading) {
    return (
      <div className="content-area">
        <div className="content-loading">
          <Loader size={48} className="spinner" />
          <p>Завантаження контенту...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-area">
        <div className="content-error">
          <FileQuestion size={48} />
          <h3>Помилка завантаження</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="content-area">
        <div className="content-empty">
          <FileQuestion size={64} />
          <h2>Оберіть тему</h2>
          <p>Виберіть тему з бокової панелі для перегляду питань</p>
        </div>
      </div>
    );
  }

  const questions = content.questions || [];

  if (questions.length === 0) {
    return (
      <div className="content-area">
        <div className="content-empty">
          <FileQuestion size={64} />
          <h2>Питання не знайдено</h2>
          <p>
            {searchTerm 
              ? `Немає результатів для "${searchTerm}"` 
              : 'У цьому розділі поки немає питань'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area" data-topic-id={currentTopicId}>
      <div className="content-header">
        <h1>{content.title}</h1>
        <div className="header-actions">
          <span className="questions-count">
            {questions.length} {questions.length === 1 ? 'питання' : 'питань'}
          </span>
          <button
            className={`complete-btn ${completed ? 'completed' : ''}`}
            onClick={handleToggleComplete}
            title={completed ? 'Скасувати завершення' : 'Відмітити як завершено'}
          >
            <CheckCircle2 size={20} />
            {completed ? 'Завершено' : 'Завершити'}
          </button>
        </div>
      </div>
      
      <div className="questions-list">
        {questions.map((question, index) => (
          <QuestionCard 
            key={question.id} 
            question={question} 
            index={index} 
            topicId={currentTopicId}
            onShowFavorites={onShowFavorites}
          />
        ))}
      </div>

      <div className="topic-navigation-footer">
        <button
          className="nav-btn prev-btn"
          onClick={() => handleNavigate('prev')}
          disabled={!prevTopic}
          title={prevTopic ? `Попередня: ${prevTopic.title}` : 'Немає попередньої теми'}
        >
          <ChevronLeft size={20} />
          <span>
            {prevTopic ? (
              <>
                <span className="nav-label">Попередня</span>
                <span className="nav-title">{prevTopic.title}</span>
              </>
            ) : (
              <span className="nav-label">Попередня</span>
            )}
          </span>
        </button>

        <button
          className="nav-btn next-btn"
          onClick={() => handleNavigate('next')}
          disabled={!nextTopic}
          title={nextTopic ? `Наступна: ${nextTopic.title}` : 'Немає наступної теми'}
        >
          <span>
            {nextTopic ? (
              <>
                <span className="nav-label">Наступна</span>
                <span className="nav-title">{nextTopic.title}</span>
              </>
            ) : (
              <span className="nav-label">Наступна</span>
            )}
          </span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ContentArea;
