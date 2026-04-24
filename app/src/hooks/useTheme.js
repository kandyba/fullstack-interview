import { useState, useEffect } from 'react';

/**
 * Хук для управління темою (світла/темна)
 */
export const useTheme = (initialTheme = 'dark') => {
  const [darkMode, setDarkMode] = useState(initialTheme === 'dark');

  useEffect(() => {
    // Встановлюємо тему при монтуванні
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { darkMode, toggleTheme };
};
