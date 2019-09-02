import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import {store} from './redux';

Modal.setAppElement('#root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

