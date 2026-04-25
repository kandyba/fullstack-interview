import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import App from '../components/App';
import NotFound from '../components/NotFound';
import { ROUTES } from '../constants/routes';
import { TOPIC_IDS } from '../constants/topicIds';

const appRoutes = (
  <>
    <Route path={ROUTES.home} element={<App />} />
    <Route path={ROUTES.questions} element={<App />} />
    <Route path={ROUTES.legacyQuestionJsPractice} element={<Navigate to={ROUTES.jsPractice} replace />} />
    <Route path={ROUTES.legacyQuestionJsSeniorBasics} element={<Navigate to={ROUTES.questionsTopic(TOPIC_IDS.jsPatternsSenior)} replace />} />
    <Route path={`${ROUTES.questions}/:topicId`} element={<App />} />
    <Route path={ROUTES.tasks} element={<Navigate to={ROUTES.jsPractice} replace />} />
    <Route path={ROUTES.jsPractice} element={<App />} />
    <Route path={ROUTES.favorites} element={<App />} />
    <Route path={ROUTES.notFound} element={<NotFound />} />
    <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
  </>
);

export default appRoutes;
