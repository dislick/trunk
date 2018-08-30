import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './store';
import { LoginPageConnected } from './connected/login_page_connected';

import 'reset-css';
import './styles/main.scss';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => <LoginPageConnected />} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));
