import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './store';
import { LoginPage } from './pages/login_page';

import 'reset-css';
import './styles/main.scss';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => <LoginPage />} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));
