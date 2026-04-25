// Структура всіх тем для співбесід
export const topics = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '⚛️',
    children: [
      { 
        id: 'css-main', 
        title: 'HTML & CSS', 
        icon: '🎨',
        file: 'frontend/html-css/frontend-interview-css-scss.json',
        level: 'Junior-Middle'
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        icon: '📜',
        children: [
          { 
            id: 'js-general', 
            title: 'Web Basics', 
            file: 'frontend/javascript/frontend-interview-general.json',
            level: 'Junior'
          },
          {
            id: 'js-core-concepts',
            title: 'Core Concepts',
            icon: '📘',
            children: [
              { 
                id: 'js-core-concepts-main', 
                title: 'Core Concepts', 
                file: 'frontend/javascript/frontend-interview-js.json',
                level: 'Junior-Middle',
                questionRange: [0, 80]
              }
            ]
          },
          {
            id: 'js-advanced-topics',
            title: 'Advanced Topics',
            icon: '📗',
            children: [
              { 
                id: 'js-advanced-middle', 
                title: 'Advanced Topics', 
                file: 'frontend/javascript/frontend-interview-js-advanced.json',
                level: 'Middle',
                questionRange: [0, 24]
              },
              { 
                id: 'js-advanced-senior', 
                title: 'Advanced Topics', 
                file: 'frontend/javascript/frontend-interview-js-advanced.json',
                level: 'Senior',
                questionRange: [24, 48]
              }
            ]
          },
          {
            id: 'js-patterns-architecture',
            title: 'Patterns & Architecture',
            icon: '🏗️',
            children: [
              { 
                id: 'js-patterns-senior', 
                title: 'Patterns & Architecture', 
                file: 'frontend/javascript/frontend-interview-js.json',
                level: 'Senior',
                questionRange: [80, 124]
              }
            ]
          },
          { 
            id: 'js-practice', 
            title: 'JS Practice', 
            file: 'frontend/javascript/frontend-interview-js-practice.json',
            level: 'All Levels'
          }
        ]
      },
      { 
        id: 'ts-main', 
        title: 'TypeScript', 
        icon: '🔷',
        file: 'frontend/typescript/frontend-interview-typescript.json',
        level: 'Middle'
      },
      {
        id: 'react',
        title: 'React',
        icon: '⚛️',
        children: [
          { 
            id: 'react-junior', 
            title: 'React', 
            file: 'frontend/react/frontend-interview-react.json',
            level: 'Junior',
            questionRange: [0, 20]
          },
          { 
            id: 'react-middle', 
            title: 'React', 
            file: 'frontend/react/frontend-interview-react.json',
            level: 'Middle',
            questionRange: [20, 35]
          },
          { 
            id: 'react-senior', 
            title: 'React', 
            file: 'frontend/react/frontend-interview-react.json',
            level: 'Senior',
            questionRange: [35, 50]
          }
        ]
      },
      { 
        id: 'nextjs-main', 
        title: 'Next.js', 
        icon: '▲',
        file: 'frontend/nextjs/frontend-interview-nextjs.json',
        level: 'Middle-Senior'
      },
      {
        id: 'redux',
        title: 'Redux',
        icon: '🔄',
        children: [
          { 
            id: 'redux-basics', 
            title: 'Redux Основи', 
            file: 'frontend/redux/redux-basics.json',
            level: 'Middle'
          },
          { 
            id: 'redux-toolkit', 
            title: 'Redux Toolkit', 
            file: 'frontend/redux/redux-toolkit.json',
            level: 'Middle'
          }
        ]
      },
      { 
        id: 'angular-main', 
        title: 'Angular', 
        icon: '🅰️',
        file: 'frontend/angular/angular-interview.json',
        level: 'Middle-Senior'
      },
      { 
        id: 'rxjs-main', 
        title: 'RxJS', 
        icon: '🌊',
        file: 'frontend/rxjs/rxjs-interview.json',
        level: 'Middle'
      },
      { 
        id: 'ngrx-main', 
        title: 'NgRx', 
        icon: '🏪',
        file: 'frontend/ngrx/ngrx-interview.json',
        level: 'Senior'
      },
      { 
        id: 'solid-main', 
        title: 'Принципи SOLID', 
        icon: '🏛️',
        file: 'frontend/solid/solid-principles.json',
        level: 'Middle-Senior'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '🔧',
    children: [
      { 
        id: 'nodejs-main', 
        title: 'Node.js', 
        icon: '🟢',
        file: 'backend/nodejs/frontend-interview-nodejs.json',
        level: 'Junior-Middle'
      },
      { 
        id: 'db-main', 
        title: 'Database', 
        icon: '🗄️',
        file: 'backend/database/frontend-interview-database.json',
        level: 'Middle'
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: '🚀',
    children: [
      { 
        id: 'devops-main', 
        title: 'DevOps Основи', 
        file: 'devops/frontend-interview-devops.json',
        level: 'Middle-Senior'
      },
      { 
        id: 'ci-cd', 
        title: 'CI/CD', 
        file: 'devops/ci-cd/frontend-interview-ci-cd.json',
        level: 'Middle-Senior'
      }
    ]
  },
  { 
    id: 'git-main', 
    title: 'Git', 
    icon: '📦',
    file: 'git/frontend-interview-git.json',
    level: 'Junior-Middle'
  },
  { 
    id: 'english-main', 
    title: 'English Interview', 
    icon: '🇬🇧',
    file: 'english/english.json',
    level: 'All Levels'
  }
];

export const findTopicById = (id, items = topics) => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findTopicById(id, item.children);
      if (found) return found;
    }
  }
  return null;
};

export const getAllLeafTopics = (items = topics) => {
  const leaves = [];
  
  const traverse = (items) => {
    items.forEach(item => {
      if (item.file) {
        leaves.push(item);
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  };
  
  traverse(items);
  return leaves;
};

// Road Map - послідовність тем від Junior до Senior
export const learningRoadMap = [
  // Junior Level - Основи
  { id: 'css-main', title: 'HTML & CSS', level: 'Junior', order: 1 },
  { id: 'js-general', title: 'Web Basics', level: 'Junior', order: 2 },
  { id: 'js-core-concepts-main', title: 'JS Core Concepts', level: 'Junior', order: 3 },
  { id: 'git-main', title: 'Git', level: 'Junior', order: 4 },
  { id: 'react-junior', title: 'React', level: 'Junior', order: 5 },
  
  // Middle Level - Поглиблене вивчення
  { id: 'js-advanced-middle', title: 'JS Advanced Topics', level: 'Middle', order: 7 },
  { id: 'ts-main', title: 'TypeScript', level: 'Middle', order: 8 },
  { id: 'react-middle', title: 'React', level: 'Middle', order: 9 },
  { id: 'redux-basics', title: 'Redux Основи', level: 'Middle', order: 10 },
  { id: 'redux-toolkit', title: 'Redux Toolkit', level: 'Middle', order: 11 },
  { id: 'nodejs-main', title: 'Node.js', level: 'Middle', order: 12 },
  { id: 'db-main', title: 'Database', level: 'Middle', order: 13 },
  { id: 'solid-main', title: 'Принципи SOLID', level: 'Middle', order: 14 },
  
  // Senior Level - Експертні знання
  { id: 'js-patterns-senior', title: 'JS Patterns & Architecture', level: 'Senior', order: 15 },
  { id: 'js-advanced-senior', title: 'JS Advanced Topics', level: 'Senior', order: 16 },
  { id: 'react-senior', title: 'React', level: 'Senior', order: 17 },
  { id: 'nextjs-main', title: 'Next.js', level: 'Senior', order: 18 },
  { id: 'angular-main', title: 'Angular', level: 'Senior', order: 19 },
  { id: 'rxjs-main', title: 'RxJS', level: 'Senior', order: 20 },
  { id: 'ngrx-main', title: 'NgRx', level: 'Senior', order: 21 },
  { id: 'devops-main', title: 'DevOps', level: 'Senior', order: 22 },
  { id: 'ci-cd', title: 'CI/CD', level: 'Senior', order: 23 },
  
  // Додатково (можна вивчати в будь-який момент)
  { id: 'js-practice', title: 'JS Practice', level: 'Practice', order: 100 },
  { id: 'english-main', title: 'English Interview', level: 'Soft Skills', order: 101 }
];

// Отримати наступну тему в Road Map
export const getNextTopic = (currentId) => {
  const currentIndex = learningRoadMap.findIndex(item => item.id === currentId);
  if (currentIndex === -1 || currentIndex === learningRoadMap.length - 1) return null;
  return learningRoadMap[currentIndex + 1];
};

// Отримати попередню тему в Road Map
export const getPreviousTopic = (currentId) => {
  const currentIndex = learningRoadMap.findIndex(item => item.id === currentId);
  if (currentIndex === -1 || currentIndex === 0) return null;
  return learningRoadMap[currentIndex - 1];
};

// Отримати прогрес по Road Map (скільки тем завершено)
export const getRoadMapProgress = (completedTopics = []) => {
  const mainTopics = learningRoadMap.filter(item => item.order < 100);
  const completed = mainTopics.filter(item => completedTopics.includes(item.id));
  return {
    total: mainTopics.length,
    completed: completed.length,
    percentage: Math.round((completed.length / mainTopics.length) * 100)
  };
};
