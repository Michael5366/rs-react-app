import './main.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
