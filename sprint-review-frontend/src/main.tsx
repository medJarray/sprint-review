import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SprintProvider } from './context/SprintContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SprintProvider>
        <App />
      </SprintProvider>
    </BrowserRouter>
  </React.StrictMode>
);