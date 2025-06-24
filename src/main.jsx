import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';
import './index.css';
import './styles/main.css';

// Criando uma "raiz" para renderizar o aplicativo React dentro da div com id="root" no HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendera dentro da raiz
root.render(
  // Ajuda a encontrar problemas no código
  <React.StrictMode>
    {/* Navegação entre páginas usando rotas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
