import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { findTopicById } from '../data/topics';
import { ROUTES } from '../constants/routes';
import { TOPIC_IDS, normalizeTopicId } from '../constants/topicIds';

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
  const currentPage =
    location.pathname.startsWith(ROUTES.tasks) || location.pathname.startsWith(ROUTES.jsPractice)
      ? 'tasks'
      : 'questions';
  
  // Синхронізувати topicId з URL
  useEffect(() => {
    if (topicId) {
      const normalizedTopicId = normalizeTopicId(topicId);
      if (normalizedTopicId !== topicId) {
        navigate(ROUTES.questionsTopic(normalizedTopicId), { replace: true });
        return;
      }

      const topic = findTopicById(normalizedTopicId);
      if (topic) {
        setSelectedTopic(topic);
        setShowingFavorites(false);
      } else {
        navigate(ROUTES.notFound, { replace: true });
      }
    } else if (location.pathname === ROUTES.jsPractice) {
      const topic = findTopicById(TOPIC_IDS.jsPractice);
      if (topic) {
        setSelectedTopic(topic);
        setShowingFavorites(false);
      } else {
        navigate(ROUTES.notFound, { replace: true });
      }
    } else if (location.pathname === ROUTES.favorites) {
      setShowingFavorites(true);
      setSelectedTopic(null);
    } else if (location.pathname === ROUTES.home) {
      setSelectedTopic(null);
      setShowingFavorites(false);
    }
  }, [topicId, location.pathname, navigate]);

  const handleSelectTopic = (topicOrId) => {
    setShowingFavorites(false);
    
    if (!topicOrId) {
      setSelectedTopic(null);
      navigate(ROUTES.home);
      return;
    }

    const topic = typeof topicOrId === 'string' 
      ? findTopicById(normalizeTopicId(topicOrId))
      : topicOrId;
    
    setSelectedTopic(topic);
    if (topic?.id) {
      if (topic.id === TOPIC_IDS.jsPractice) {
        navigate(ROUTES.jsPractice);
      } else {
        navigate(ROUTES.questionsTopic(topic.id));
      }
    }
  };

  const handleShowFavorites = () => {
    setShowingFavorites(true);
    setSelectedTopic(null);
    setFavoritesRefresh(prev => prev + 1);
    navigate(ROUTES.favorites);
  };

  const handlePageChange = (page) => {
    if (page === 'tasks') {
      navigate(ROUTES.jsPractice);
    } else {
      navigate(ROUTES.questions);
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
