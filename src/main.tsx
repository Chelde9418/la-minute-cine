import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TinaCMSProvider } from './components/TinaProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TinaCMSProvider>
      <App />
    </TinaCMSProvider>
  </StrictMode>,
);
