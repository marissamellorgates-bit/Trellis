import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import TutorialPage from './components/TutorialPage.tsx';
import PlantPreview from './components/PlantPreview.tsx';
import './index.css';

registerSW({ onOfflineReady() {} });

const path = window.location.pathname.replace(/\/$/, '');
const isTutorial = path === '/tutorial';
const isPlantPreview = path === '/plants';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPlantPreview ? <PlantPreview /> : isTutorial ? <TutorialPage /> : <App />}
  </StrictMode>
);
