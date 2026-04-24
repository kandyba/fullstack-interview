# 🎯 Interview Pro

**Interactive platform for preparing for Frontend / Fullstack JavaScript Developer interviews.**

Modern React SPA application with routing support, learning progress tracking, and bilingual interface (🇺🇦 Ukrainian / 🇬🇧 English).

---

## ✨ Key Features

### 🗺️ Learning Road Map
- **Structured learning path** from Junior to Senior level
- Visual progress indicator (X/23 topics completed)
- Topics grouped by difficulty level
- Mark completed topics with localStorage persistence

### 📚 Knowledge Base
- **1000+ interview questions** and answers
- **25+ technical topics**: JavaScript, TypeScript, React, Node.js, Git, DevOps and more
- Questions divided by levels: Junior / Middle / Senior
- Practical JavaScript tasks

### 🔍 Functionality
- **Quick search** across all questions
- **⭐ Favorites** - bookmark questions
- **Topic navigation** - "Previous" / "Next" buttons
- **Personalization** - dark/light theme
- **Bilingual** - full support for Ukrainian and English

### 🎨 UX/UI
- Responsive design with mobile support
- Horizontal navigation with visual level badges
- Smooth animations and transitions
- Special design for English Interview section

---

## 🏗️ Tech Stack

### Frontend
- **React 18+** - UI library
- **React Router v6** - client-side routing
- **Vite** - build tool and dev server
- **Lucide React** - icons

### State Management
- React Context API (LanguageContext)
- Custom hooks (useHTMLContent, useSearch, useProgress)
- localStorage for data persistence

### Styling
- CSS3 with CSS Variables for theming
- Custom CSS per component
- Lexend font for better readability

---

## 📁 Project Structure

```
fullstack-interview/
├── app/                           # React application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── App.jsx           # Main component with routing
│   │   │   ├── RoadMapProgress.jsx  # Learning Road Map
│   │   │   ├── ContentArea.jsx   # Questions display
│   │   │   ├── FavoritesView.jsx # Saved questions
│   │   │   ├── WelcomeView.jsx   # Dashboard
│   │   │   ├── TopNavBar.jsx     # Horizontal navigation
│   │   │   └── NotFound.jsx      # 404 page
│   │   ├── contexts/             # React Context
│   │   │   └── LanguageContext.jsx
│   │   ├── hooks/                # Custom hooks
│   │   │   └── useContent.js
│   │   ├── utils/                # Utilities
│   │   │   ├── htmlParser.js     # Parse HTML questions
│   │   │   ├── favorites.js      # Favorites management
│   │   │   └── progress.js       # Progress tracking
│   │   ├── data/                 # Configuration
│   │   │   └── topics.js         # Topics structure & Road Map
│   │   ├── i18n/                 # Internationalization
│   │   │   └── translations.js
│   │   └── styles/               # CSS styles
│   ├── index.html
│   └── vite.config.js
├── frontend/                      # HTML question files
│   ├── javascript/
│   ├── react/
│   ├── typescript/
│   └── ...
├── backend/
│   ├── nodejs/
│   └── database/
├── devops/
├── git/
├── english/
├── server.js                      # Express server
└── package.json
```

---

## 🚀 Quick Start

### Requirements
- Node.js v16+ 
- npm v7+

### Installation

```bash
# Clone repository
git clone <repository-url>

# Navigate to project directory
cd fullstack-interview

# Install dependencies
npm install
```

### Running

```bash
# Development mode (auto-reload)
npm run dev

# Open in browser
http://localhost:3000
```

Development server runs on fixed port 3000.

---

## 📚 Available Topics

### Frontend
- **HTML & CSS** (Junior-Middle)
- **JavaScript Basics** (Junior, Middle, Senior)
- **JavaScript Advanced** (Middle, Senior)  
- **TypeScript** (Middle)
- **React** (Junior, Middle, Senior)
- **Next.js** (Middle-Senior)
- **Redux / Redux Toolkit** (Middle)
- **Angular / RxJS / NgRx** (Middle-Senior)
- **SOLID Principles** (Middle-Senior)

### Backend
- **Node.js** (Junior-Middle)
- **Databases** (Middle)

### DevOps & Tools
- **Git** (Junior-Middle)
- **DevOps** (Middle-Senior)
- **CI/CD** (Middle-Senior)

### Soft Skills
- **English Interview** - common English interview questions

### Practice
- **JS Practice** - hands-on JavaScript exercises

---

## 💾 Local Storage

The application uses **localStorage** to save:
- 🌍 **Interface language** (`interview-language`)
- ⭐ **Saved questions** (`interview-favorites`)
- ✅ **Learning progress** (`interview-progress`)

All data is stored locally in the browser and not sent to any server.

---

## 🎯 Road Map Features

Learning Road Map contains **23 main topics** grouped by level:

### Junior (5 topics)
HTML & CSS → Web Basics → JS Basics → Git → React Basics

### Middle (9 topics)
JS Core → JS Advanced → TypeScript → React → Redux → Node.js → Database → SOLID

### Senior (9 topics)
JS Expert → React Advanced → Next.js → Angular → RxJS → NgRx → DevOps → CI/CD

### Additional
JS Practice, English Interview

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Start production server
npm start

# Stop all processes
pkill -f "npm run dev"
```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is created for personal use and learning purposes.

---

## ✨ Author

**Serhii Kandyba**

- 💼 Frontend Developer
- 🔗 [LinkedIn](https://www.linkedin.com/in/serhii-kandyba)

---

## 🙏 Acknowledgments

Thanks to everyone who contributed to creating questions and answers for this project!