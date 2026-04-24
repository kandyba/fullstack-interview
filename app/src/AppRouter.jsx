import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import appRoutes from './routes/AppRoutes';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>{appRoutes}</Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
