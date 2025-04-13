import React from 'react';
import ReactDOM from 'react-dom/client';
import { init as initEmailJS } from '@emailjs/browser';
import App from './App';

initEmailJS('KhKibvz_hCqlDhpZ6');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);