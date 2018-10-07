import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { LoginPageConnected } from './connected/login_page_connected';
import { MainPageConnected } from './connected/main_page_connected';
import { RegisterPageConnected } from './connected/register_page_connected';
import { history, store } from './store';

import 'reset-css';
import './favicon.ico';
import './styles/main.scss';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/login' render={() => <LoginPageConnected />} />
        <Route path='/invite/:code' render={() => <RegisterPageConnected />} />
        <Route exact path='/' render={() => <MainPageConnected />} />
        <Route path='/search/:query' render={() => <MainPageConnected />} />
        <Route render={() => (<div>Client 404</div>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));
