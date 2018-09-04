import * as React from 'react';
import { TextField } from '../components/textfield';
import { Button } from '../components/button';

import './login_page.scss';

interface Props {
  username: string;
  password: string;
  isFetching: boolean;
  providedInvalidCredentials: boolean;
  onChangeUsername: (username: string) => any;
  onChangePassword: (password: string) => any;
  onSubmit: () => any;
}

export const LoginPage = (props: Props) => (
  <div className='login-page-wrapper'>
    <div className="login-inner">
      <img src={require('../assets/trunk_logo.svg')} className='logo' />

      <div className="textbox-wrapper">
        <TextField
          value={props.username}
          placeholder='Username or Email'
          name='email'
          onChange={event => props.onChangeUsername(event.target.value)}
        />
        <TextField
          value={props.password}
          placeholder='Password'
          name='password'
          type='password'
          onChange={event => props.onChangePassword(event.target.value)}
        />
      </div>

      {props.isFetching && <p>isFetching</p>}
      {props.providedInvalidCredentials && <p>Invalid credentials</p>}
      <Button onClick={props.onSubmit}>Login</Button>
    </div>
  </div>
);
