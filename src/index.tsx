import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider as ReduxProvider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import configureStore from "./configureStore";

const history = createBrowserHistory();
const initialState = (window as any).initialReduxState;

const store = configureStore(history, initialState);
ReactDOM.render(
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ReduxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
