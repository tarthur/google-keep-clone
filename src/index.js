import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
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

