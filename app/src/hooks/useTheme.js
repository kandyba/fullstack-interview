import { useState, useEffect } from 'react';

/**
 * Хук для управління темою (світла/темна)
 */
export const useTheme = (initialTheme = 'dark') => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('interview-theme');
    if (saved) return saved === 'dark';
    return initialTheme === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('interview-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('interview-theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return { darkMode, toggleTheme };
};
