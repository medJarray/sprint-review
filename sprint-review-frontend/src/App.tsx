import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PresentationPage from './pages/PresentationPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/presentation" element={<PresentationPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/presentation" replace />} />
    </Routes>
  );
};

export default App;
