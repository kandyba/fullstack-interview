// Favorites management functions
export const loadFavorites = () => {
  try {
    const stored = localStorage.getItem('interview-favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('interview-favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const addFavorite = (questionId, topicId) => {
  const favorites = loadFavorites();
  const newFavorite = {
    questionId,
    topicId,
    addedAt: Date.now()
  };
  
  // Check if not already favorited
  if (!favorites.some(f => f.questionId === questionId && f.topicId === topicId)) {
    favorites.push(newFavorite);
    saveFavorites(favorites);
  }
  
  return favorites;
};

export const removeFavorite = (questionId, topicId) => {
  const favorites = loadFavorites();
  const filtered = favorites.filter(f => 
    !(f.questionId === questionId && f.topicId === topicId)
  );
  saveFavorites(filtered);
  return filtered;
};

export const isFavorite = (questionId, topicId) => {
  const favorites = loadFavorites();
  return favorites.some(f => f.questionId === questionId && f.topicId === topicId);
};

export const getFavoritesByTopic = (topicId) => {
  const favorites = loadFavorites();
  return favorites.filter(f => f.topicId === topicId);
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
