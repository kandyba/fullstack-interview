// Управління прогресом навчання

const PROGRESS_KEY = 'interview-progress';

// Завантажити прогрес з localStorage
export const loadProgress = () => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading progress:', error);
    return [];
  }
};

// Зберегти прогрес у localStorage
export const saveProgress = (completedTopics) => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedTopics));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Відмітити тему як завершену
export const markTopicCompleted = (topicId) => {
  const progress = loadProgress();
  if (!progress.includes(topicId)) {
    const updated = [...progress, topicId];
    saveProgress(updated);
    return updated;
  }
  return progress;
};

// Скасувати завершення теми
export const unmarkTopicCompleted = (topicId) => {
  const progress = loadProgress();
  const updated = progress.filter(id => id !== topicId);
  saveProgress(updated);
  return updated;
};

// Перевірити, чи тема завершена
export const isTopicCompleted = (topicId) => {
  const progress = loadProgress();
  return progress.includes(topicId);
};

// Очистити весь прогрес
export const clearProgress = () => {
  localStorage.removeItem(PROGRESS_KEY);
  return [];
};

// Отримати статистику прогресу
export const getProgressStats = (allTopicIds = []) => {
  const completed = loadProgress();
  return {
    completed: completed.length,
    total: allTopicIds.length,
    percentage: allTopicIds.length > 0 
      ? Math.round((completed.length / allTopicIds.length) * 100) 
      : 0
  };
};
