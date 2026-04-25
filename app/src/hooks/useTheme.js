import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';

/**
 * Хук для управління темою (світла/темна)
 */
export const useTheme = (initialTheme = 'dark') => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved) return saved === 'dark';
    return initialTheme === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.theme, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.theme, 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return { darkMode, toggleTheme };
};
