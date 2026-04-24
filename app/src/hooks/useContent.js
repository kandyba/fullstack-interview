import { useState, useEffect } from 'react';
import { parseHTMLContent } from '../utils/htmlParser';

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

    parseHTMLContent(topic.file)
      .then(data => {
        // Filter questions by range if specified
        if (topic.questionRange) {
          const [start, end] = topic.questionRange;
          data.questions = data.questions.slice(start, end);
          // Re-index question IDs after slicing
          data.questions = data.questions.map((q, idx) => ({
            ...q,
            id: `q-${idx + 1}`
          }));
          data.totalQuestions = data.questions.length;
          // Update title to include level
          if (topic.level) {
            data.title = `${topic.title} (${topic.level})`;
          }
        } else if (topic.title) {
          // Use topic title if available
          data.title = topic.title;
        }
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
