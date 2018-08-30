import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import rootReducer from './reducer';

export const history = createBrowserHistory()

export const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);
