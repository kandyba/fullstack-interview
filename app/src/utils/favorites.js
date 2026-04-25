// Favorites management functions
import { STORAGE_KEYS } from '../constants/storageKeys';
import { normalizeTopicId } from '../constants/topicIds';

const FAVORITES_KEY = STORAGE_KEYS.favorites;

const migrateFavorites = (favorites = []) => {
  const mapped = favorites.map((favorite) => ({
    ...favorite,
    topicId: normalizeTopicId(favorite.topicId)
  }));

  const unique = [];
  const seen = new Set();

  mapped.forEach((favorite) => {
    const key = `${favorite.questionId}::${favorite.topicId}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(favorite);
    }
  });

  return unique;
};

export const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const migrated = migrateFavorites(parsed);

    if (stored && JSON.stringify(parsed) !== JSON.stringify(migrated)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(migrated));
    }

    return migrated;
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const addFavorite = (questionId, topicId) => {
  const normalizedTopicId = normalizeTopicId(topicId);
  const favorites = loadFavorites();
  const newFavorite = {
    questionId,
    topicId: normalizedTopicId,
    addedAt: Date.now()
  };
  
  // Check if not already favorited
  if (!favorites.some(f => f.questionId === questionId && f.topicId === normalizedTopicId)) {
    favorites.push(newFavorite);
    saveFavorites(favorites);
  }
  
  return favorites;
};

export const removeFavorite = (questionId, topicId) => {
  const normalizedTopicId = normalizeTopicId(topicId);
  const favorites = loadFavorites();
  const filtered = favorites.filter(f => 
    !(f.questionId === questionId && f.topicId === normalizedTopicId)
  );
  saveFavorites(filtered);
  return filtered;
};

export const isFavorite = (questionId, topicId) => {
  const normalizedTopicId = normalizeTopicId(topicId);
  const favorites = loadFavorites();
  return favorites.some(f => f.questionId === questionId && f.topicId === normalizedTopicId);
};

export const getFavoritesByTopic = (topicId) => {
  const normalizedTopicId = normalizeTopicId(topicId);
  const favorites = loadFavorites();
  return favorites.filter(f => f.topicId === normalizedTopicId);
};

export const getAllFavoritesGrouped = () => {
  const favorites = loadFavorites();
  const grouped = {};
  
  favorites.forEach(fav => {
    if (!grouped[fav.topicId]) {
      grouped[fav.topicId] = [];
    }
    grouped[fav.topicId].push(fav);
  });
  
  return grouped;
};
