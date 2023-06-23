import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <GoogleOAuthProvider clientId="370891296555-0780mptjok2ob6gq9kjj8ele3pdtkha5.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);

reportWebVitals();
