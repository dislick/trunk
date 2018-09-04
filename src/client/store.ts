import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from './reducer';
import thunk from 'redux-thunk';

export const history = createBrowserHistory()

export const store = createStore(
  connectRouter(history)(rootReducer),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);
