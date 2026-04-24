import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './components/App';
import NotFound from './components/NotFound';
import { LanguageProvider } from './contexts/LanguageContext';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/questions" element={<App />} />
          <Route path="/questions/:topicId" element={<App />} />
          <Route path="/tasks" element={<App />} />
          <Route path="/favorites" element={<App />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
