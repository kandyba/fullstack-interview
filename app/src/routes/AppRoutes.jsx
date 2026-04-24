import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import App from '../components/App';
import NotFound from '../components/NotFound';

const AppRoutes = () => (
  <>
    <Route path="/" element={<App />} />
    <Route path="/questions" element={<App />} />
    <Route path="/questions/js-practice" element={<Navigate to="/js-practice" replace />} />
    <Route path="/questions/:topicId" element={<App />} />
    <Route path="/tasks" element={<Navigate to="/js-practice" replace />} />
    <Route path="/js-practice" element={<App />} />
    <Route path="/favorites" element={<App />} />
    <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </>
);

export default AppRoutes;
