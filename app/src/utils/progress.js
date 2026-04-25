// Управління прогресом навчання
import { STORAGE_KEYS } from '../constants/storageKeys';
import { normalizeTopicId } from '../constants/topicIds';

const PROGRESS_KEY = STORAGE_KEYS.progress;

const migrateProgress = (progress = []) => {
  const migrated = progress.map((id) => normalizeTopicId(id));
  return [...new Set(migrated)];
};

// Завантажити прогрес з localStorage
export const loadProgress = () => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const migrated = migrateProgress(parsed);

    if (stored && JSON.stringify(parsed) !== JSON.stringify(migrated)) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(migrated));
    }

    return migrated;
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
  const normalizedTopicId = normalizeTopicId(topicId);
  const progress = loadProgress();
  if (!progress.includes(normalizedTopicId)) {
    const updated = [...progress, normalizedTopicId];
    saveProgress(updated);
    return updated;
  }
  return progress;
};

// Скасувати завершення теми
export const unmarkTopicCompleted = (topicId) => {
  const normalizedTopicId = normalizeTopicId(topicId);
  const progress = loadProgress();
  const updated = progress.filter(id => id !== normalizedTopicId);
  saveProgress(updated);
  return updated;
};

// Перевірити, чи тема завершена
export const isTopicCompleted = (topicId) => {
  const normalizedTopicId = normalizeTopicId(topicId);
  const progress = loadProgress();
  return progress.includes(normalizedTopicId);
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
