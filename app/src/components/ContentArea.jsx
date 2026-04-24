import React, { useState, useEffect } from 'react';
import { FileQuestion, Loader, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';
import { getNextTopic, getPreviousTopic, findTopicById } from '../data/topics';
import { isTopicCompleted, markTopicCompleted, unmarkTopicCompleted } from '../utils/progress';

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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-start gap-3">
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-emerald-500 px-2 text-sm font-semibold text-white">{index + 1}</span>
        <h3 className="flex-1 text-lg font-semibold leading-7 text-slate-900 dark:text-slate-100" dangerouslySetInnerHTML={{ __html: question.question }} />
        <button 
          className={`rounded-lg p-1.5 transition ${isFav ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:bg-slate-100 hover:text-emerald-500 dark:hover:bg-slate-800'}`}
          onClick={handleToggleFavorite}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={20} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="content-prose text-[15px] text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: question.answer }} />
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
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <Loader size={48} className="mx-auto animate-spin text-emerald-500" />
          <p>Завантаження контенту...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-rose-500">
          <FileQuestion size={48} />
          <h3 className="mt-3 text-xl font-semibold">Помилка завантаження</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <FileQuestion size={64} />
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Оберіть тему</h2>
          <p>Виберіть тему з бокової панелі для перегляду питань</p>
        </div>
      </div>
    );
  }

  const questions = content.questions || [];

  if (questions.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <FileQuestion size={64} />
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Питання не знайдено</h2>
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
    <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6" data-topic-id={currentTopicId}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">{content.title}</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {questions.length} {questions.length === 1 ? 'питання' : 'питань'}
          </span>
          <button
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              completed
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300'
            }`}
            onClick={handleToggleComplete}
            title={completed ? 'Скасувати завершення' : 'Відмітити як завершено'}
          >
            <CheckCircle2 size={20} />
            {completed ? 'Завершено' : 'Завершити'}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
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

      <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 md:grid-cols-2">
        <button
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition enabled:hover:-translate-y-0.5 enabled:hover:border-emerald-500 enabled:hover:shadow dark:border-slate-700 dark:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => handleNavigate('prev')}
          disabled={!prevTopic}
          title={prevTopic ? `Попередня: ${prevTopic.title}` : 'Немає попередньої теми'}
        >
          <ChevronLeft size={20} className="text-emerald-500" />
          <span>
            {prevTopic ? (
              <>
                <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Попередня</span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{prevTopic.title}</span>
              </>
            ) : (
              <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Попередня</span>
            )}
          </span>
        </button>

        <button
          className="flex items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right transition enabled:hover:-translate-y-0.5 enabled:hover:border-emerald-500 enabled:hover:shadow dark:border-slate-700 dark:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => handleNavigate('next')}
          disabled={!nextTopic}
          title={nextTopic ? `Наступна: ${nextTopic.title}` : 'Немає наступної теми'}
        >
          <span>
            {nextTopic ? (
              <>
                <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Наступна</span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{nextTopic.title}</span>
              </>
            ) : (
              <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Наступна</span>
            )}
          </span>
          <ChevronRight size={20} className="text-emerald-500" />
        </button>
      </div>
    </div>
  );
};

export default ContentArea;
