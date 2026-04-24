import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRoutes from './routes/AppRoutes';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <AppRoutes />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
