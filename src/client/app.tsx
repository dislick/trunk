import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './store';
import { LoginPageConnected } from './connected/login_page_connected';
import { MainPageConnected } from './connected/main_page_connected';

import 'reset-css';
import './styles/main.scss';
import './favicon.ico';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" render={() => <LoginPageConnected />} />
        <Route exact path="/" render={() => <MainPageConnected />} />
        <Route render={() => (<div>404</div>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));
