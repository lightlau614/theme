import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Resources/Asset/fonts/TT-Norms/TTNorms-Regular.otf';
import './Resources/Asset/fonts/TT-Norms/TTNorms-Bold.otf';
import './Resources/Asset/fonts/Quicksand/Quicksand-Bold.ttf';
import './Resources/Asset/fonts/Quicksand/Quicksand-Regular.ttf'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
