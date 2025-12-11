import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import App from './App';
import './assets/index.css'; 


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Fournit le store Redux à toute l'application */}
    <Provider store={store}>
      {/* Fournit les capacités de routage */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);