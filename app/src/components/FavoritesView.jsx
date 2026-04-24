import React, { useState, useEffect } from 'react';
import { Star, FileQuestion } from 'lucide-react';
import { loadFavorites, removeFavorite } from '../utils/favorites';
import { findTopicById } from '../data/topics';
import { parseHTMLContent } from '../utils/htmlParser';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/FavoritesView.css';

const FavoritesView = ({ onSelectTopic, refreshTrigger }) => {
  const [favorites, setFavorites] = useState([]);
  const [groupedFavorites, setGroupedFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadFavoriteQuestions = async () => {
      setLoading(true);
      const favs = loadFavorites();
      
      if (favs.length === 0) {
        setLoading(false);
        setFavorites([]);
        setGroupedFavorites({});
        return;
      }

      const grouped = {};
      
      for (const fav of favs) {
        const topic = findTopicById(fav.topicId);
        if (!topic || !topic.file) continue;

        try {
          const parsed = await parseHTMLContent(topic.file);
          
          // Apply questionRange filter if topic has it
          let questions = parsed.questions;
          if (topic.questionRange) {
            const [start, end] = topic.questionRange;
            questions = questions.slice(start, end);
            // Re-index question IDs after slicing
            questions = questions.map((q, idx) => ({
              ...q,
              id: `q-${idx + 1}`
            }));
          }
          
          const question = questions.find(q => q.id === fav.questionId);
          
          if (question) {
            if (!grouped[topic.id]) {
              grouped[topic.id] = {
                topic,
                questions: []
              };
            }
            grouped[topic.id].questions.push({
              ...question,
              favoriteData: fav
            });
          }
        } catch (error) {
          console.error('Error loading favorite:', error);
        }
      }

      setGroupedFavorites(grouped);
      setFavorites(favs);
      setLoading(false);
    };

    loadFavoriteQuestions();
  }, [refreshTrigger]);

  const handleRemoveFavorite = async (questionId, topicId) => {
    removeFavorite(questionId, topicId);
    
    // Re-fetch and update immediately
    setLoading(true);
    const favs = loadFavorites();
    
    if (favs.length === 0) {
      setFavorites([]);
      setGroupedFavorites({});
      setLoading(false);
      return;
    }

    const grouped = {};
    
    for (const fav of favs) {
      const topic = findTopicById(fav.topicId);
      if (!topic || !topic.file) continue;

      try {
        const parsed = await parseHTMLContent(topic.file);
        
        // Apply questionRange filter if topic has it
        let questions = parsed.questions;
        if (topic.questionRange) {
          const [start, end] = topic.questionRange;
          questions = questions.slice(start, end);
          questions = questions.map((q, idx) => ({
            ...q,
            id: `q-${idx + 1}`
          }));
        }
        
        const question = questions.find(q => q.id === fav.questionId);
        
        if (question) {
          if (!grouped[topic.id]) {
            grouped[topic.id] = {
              topic,
              questions: []
            };
          }
          grouped[topic.id].questions.push({
            ...question,
            favoriteData: fav
          });
        }
      } catch (error) {
        console.error('Error loading favorite:', error);
      }
    }

    setGroupedFavorites(grouped);
    setFavorites(favs);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="favorites-view">
        <div className="favorites-empty">
          <FileQuestion size={48} />
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-view">
        <div className="favorites-empty">
          <Star size={64} />
          <h2>{t('noFavorites')}</h2>
          <p>{t('noFavoritesHint')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-view">
      <div className="favorites-header">
        <h1>
          <Star size={32} fill="currentColor" />
          {t('favoritesTitle')}
        </h1>
        <span className="favorites-count">
          {favorites.length} {t('questionsCount')}
        </span>
      </div>

      {Object.entries(groupedFavorites).map(([topicId, data]) => (
        <div key={topicId} className="favorites-topic-group">
          <div className="topic-group-header">
            <h2>
              {data.topic.icon && <span className="topic-icon">{data.topic.icon}</span>}
              {data.topic.title}
            </h2>
            <button
              className="view-topic-btn"
              onClick={() => onSelectTopic(data.topic)}
            >
              Переглянути всі →
            </button>
          </div>

          <div className="favorites-questions-list">
            {data.questions.map((question, index) => (
              <div key={question.id} className="favorite-question-card">
                <div className="question-header">
                  <span className="question-number">{index + 1}</span>
                  <h3 className="question-text" dangerouslySetInnerHTML={{ __html: question.question }} />
                  <button
                    className="favorite-btn favorited"
                    onClick={() => handleRemoveFavorite(question.id, topicId)}
                    aria-label="Remove from favorites"
                    title="Прибрати зі збережених"
                  >
                    <Star size={20} fill="currentColor" />
                  </button>
                </div>
                <div className="answer-content" dangerouslySetInnerHTML={{ __html: question.answer }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesView;
