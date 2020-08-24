import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './style/playerBar.css'
import './style/album.css'
import './style/index.css';
import './style/library.css';
import './style/App.css';
import './style/skeleton.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
