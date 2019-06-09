import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Provider } from "mobx-react";
// import GlobalStore from './stores/GlobalStore'

import thunkMiddleware from 'redux-thunk';
import reducer from '../src/reducer/index';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer,middleware);

const Root = (
    <Provider store={store}>
      <App />
    </Provider>
)

ReactDOM.render(Root, document.getElementById('root'));

serviceWorker.unregister();
