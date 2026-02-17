import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import TutorialPage from './components/TutorialPage.tsx';
import './index.css';

registerSW({ onOfflineReady() {} });

const isTutorial = window.location.pathname.replace(/\/$/, '') === '/tutorial';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isTutorial ? <TutorialPage /> : <App />}
  </StrictMode>
);
