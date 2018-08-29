import * as React from 'react';

import './login_page.scss';
import { TextField } from '../components/textfield';
import { Button } from '../components/button';

interface PresentationalProps {

}

interface ContainerProps {

}

export class LoginPage extends React.Component<PresentationalProps & ContainerProps> {
  render() {
    return (
      <div className='login-page-wrapper'>
        <div className="login-inner">
          <img src={require('../assets/trunk_logo.svg')} className='logo' />
          <div className="textbox-wrapper">
            <TextField 
              value=''
              placeholder='Username or Email'
              onChange={(event) => {}}
            />
            <TextField 
              value=''
              placeholder='Password'
              onChange={(event) => {}}
            />
          </div>
          <Button>Login</Button>
        </div>
      </div>
    );
  }
}
