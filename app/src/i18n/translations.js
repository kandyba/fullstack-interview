export const translations = {
  uk: {
    // Navigation
    saved: '⭐ Збережені',
    questionsPage: 'Питання',
    tasks: 'JS Practice',
    feedback: 'Feedback',
    
    // Search
    searchPlaceholder: 'Пошук по запитаннях і темах...',
    searchResults: 'результатів',
    
    // Content
    questionsCount: 'Питання',
    question: 'питання',
    loading: 'Завантаження...',
    noResults: 'Нічого не знайдено',
    
    // Favorites View
    favoritesTitle: 'Збережені запитання',
    noFavorites: 'У вас поки немає збережених запитань',
    noFavoritesHint: 'Натисніть на зірочку ⭐ біля запитання, щоб додати його в збережені',
    
    // Topics
    selectTopic: 'Оберіть тему зі списку вище',
    
    // Welcome Stats
    welcomeTitle: '👋 Ласкаво просимо до Interview Pro',
    welcomeSubtitle: 'Виберіть тему або почніть пошук',
    totalQuestions: 'Питань',
    totalTasks: 'Задач',
    totalTopics: 'Тем',
    practicalTasks: 'Практичних завдань',
    
    // Road Map
    roadmap: 'Дорожня карта навчання',
    roadmapSubtitle: 'Структурований шлях від Junior до Senior розробника',
    topics: 'тем',
    nextTopic: 'Наступна тема',
    prevTopic: 'Попередня тема',
    markComplete: 'Завершити',
    markIncomplete: 'Скасувати',
    completed: 'Завершено',
    
    // Settings
    theme: 'Тема',
    language: 'Мова',
    darkTheme: 'Темна тема',
    lightTheme: 'Світла тема',
    
    // Levels
    junior: 'Junior',
    middle: 'Middle',
    senior: 'Senior',
    allLevels: 'Всі рівні',
    practice: 'Практика',
    softSkills: 'Soft Skills',
    reference: 'Довідка',
    
    // 404 Page
    notFoundTitle: 'Сторінку не знайдено',
    notFoundDescription: 'Схоже, ви перейшли за неіснуючим посиланням.',
    backToHome: 'На головну'
  },
  en: {
    // Navigation
    saved: '⭐ Saved',
    questionsPage: 'Questions',
    tasks: 'JS Practice',
    feedback: 'Feedback',
    
    // Search
    searchPlaceholder: 'Search questions and topics...',
    searchResults: 'results',
    
    // Content
    questionsCount: 'Questions',
    question: 'question',
    loading: 'Loading...',
    noResults: 'No results found',
    
    // Favorites View
    favoritesTitle: 'Saved Questions',
    noFavorites: 'You have no saved questions yet',
    noFavoritesHint: 'Click the star ⭐ next to a question to add it to your saved list',
    
    // Topics
    selectTopic: 'Select a topic from the list above',
    
    // Welcome Stats
    welcomeTitle: '👋 Welcome to Interview Pro',
    welcomeSubtitle: 'Select a topic or start searching',
    totalQuestions: 'Questions',
    totalTasks: 'Tasks',
    totalTopics: 'Topics',
    practicalTasks: 'Practical Tasks',
    
    // Road Map
    roadmap: 'Learning Road Map',
    roadmapSubtitle: 'Structured path from Junior to Senior developer',
    topics: 'topics',
    nextTopic: 'Next topic',
    prevTopic: 'Previous topic',
    markComplete: 'Complete',
    markIncomplete: 'Incomplete',
    completed: 'Completed',
    
    // Settings
    theme: 'Theme',
    language: 'Language',
    darkTheme: 'Dark theme',
    lightTheme: 'Light theme',
    
    // Levels
    junior: 'Junior',
    middle: 'Middle',
    senior: 'Senior',
    allLevels: 'All Levels',
    practice: 'Practice',
    softSkills: 'Soft Skills',
    reference: 'Reference',
    
    // 404 Page
    notFoundTitle: 'Page Not Found',
    notFoundDescription: 'It seems you followed a non-existent link.',
    backToHome: 'Back to Home'
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations.uk[key] || key;
};
