import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { findTopicById } from '../data/topics';

/**
 * Хук для управління навігацією між темами та сторінками
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topicId } = useParams();
  
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [favoritesRefresh, setFavoritesRefresh] = useState(0);
  
  // Визначити поточну сторінку з URL
  const currentPage = location.pathname.startsWith('/tasks') ? 'tasks' : 'questions';
  
  // Синхронізувати topicId з URL
  useEffect(() => {
    if (topicId) {
      const topic = findTopicById(topicId);
      if (topic) {
        setSelectedTopic(topic);
        setShowingFavorites(false);
      }
    } else if (location.pathname === '/favorites') {
      setShowingFavorites(true);
      setSelectedTopic(null);
    } else if (location.pathname === '/') {
      setSelectedTopic(null);
      setShowingFavorites(false);
    }
  }, [topicId, location.pathname]);

  const handleSelectTopic = (topicOrId) => {
    setShowingFavorites(false);
    
    if (!topicOrId) {
      setSelectedTopic(null);
      navigate('/');
      return;
    }

    const topic = typeof topicOrId === 'string' 
      ? findTopicById(topicOrId) 
      : topicOrId;
    
    setSelectedTopic(topic);
    if (topic?.id) {
      navigate(`/questions/${topic.id}`);
    }
  };

  const handleShowFavorites = () => {
    setShowingFavorites(true);
    setSelectedTopic(null);
    setFavoritesRefresh(prev => prev + 1);
    navigate('/favorites');
  };

  const handlePageChange = (page) => {
    if (page === 'tasks') {
      navigate('/tasks');
    } else {
      navigate('/questions');
    }
  };

  return {
    selectedTopic,
    showingFavorites,
    favoritesRefresh,
    currentPage,
    handleSelectTopic,
    handleShowFavorites,
    handlePageChange
  };
};
