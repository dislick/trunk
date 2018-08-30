import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import rootReducer from './reducer';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epic';

export const history = createBrowserHistory()
const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  connectRouter(history)(rootReducer),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      epicMiddleware, 
    ),
  ),
);

epicMiddleware.run(rootEpic);
