import { useState, useEffect } from 'react';
import { loadTopicContent } from '../services/contentService';

export const useHTMLContent = (topic) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!topic || !topic.file) {
      setContent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    loadTopicContent(topic)
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [topic]);

  return { content, loading, error };
};

export const useSearch = (initialValue = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedTerm, setDebouncedTerm] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    debouncedTerm
  };
};
