import * as React from 'react';
import { Button } from '../components/button';
import { Spinner } from '../components/spinner';
import { TextField } from '../components/textfield';

import { RouteComponentProps } from 'react-router';
import './register_page.scss';

interface Props {
  username: string;
  email: string;
  password: string;
  isInviteCodeValid: boolean;
  invitedBy: string;
  isFetchingValidation: boolean;
  isFetchingRegister: boolean;
  registerErrorMessage: string;
  onChangeEmail: (email: string) => any;
  onChangeUsername: (username: string) => any;
  onChangePassword: (password: string) => any;
  onValidateCode: (code: string) => any;
  onSubmit: (code: string) => any;
}

export class RegisterPage extends React.Component<Props & RouteComponentProps> {
  public componentDidMount() {
    let inviteCode = (this.props.match.params as any).code;
    this.props.onValidateCode(inviteCode);
  }

  public onRegister = () => {
    let inviteCode = (this.props.match.params as any).code;
    this.props.onSubmit(inviteCode);
  }

  public renderValidCodeContent() {
    return (
      <>
        <p className='message'>
          You have been invited by <span>dislick</span> to join <span>trunk</span>,
          the modern, private BitTorrent network.
          Please fill out the form below to create an account.
        </p>

        <div className='textbox-wrapper'>
          <TextField
            value={this.props.email}
            placeholder='Email'
            name='email'
            onChange={(event) => this.props.onChangeEmail(event.target.value)}
            onEnter={this.onRegister}
          />
          <TextField
            value={this.props.username}
            placeholder='Username'
            name='username'
            onChange={(event) => this.props.onChangeUsername(event.target.value)}
            onEnter={this.onRegister}
          />
          <TextField
            value={this.props.password}
            placeholder='Password'
            name='password'
            type='password'
            onChange={(event) => this.props.onChangePassword(event.target.value)}
            onEnter={this.onRegister}
          />
        </div>

        {this.props.isFetchingRegister
          ?
          <Spinner />
          :
          <Button onClick={this.onRegister} fullWidth>Register</Button>
        }

        {this.props.registerErrorMessage &&
          <p className='error'>{this.props.registerErrorMessage}</p>
        }
      </>
    );
  }

  public render() {
    return (
      <div className='register-page-wrapper'>
        <div className='register-inner'>
          <img src={require('../assets/trunk_logo.svg')} className='logo' />

          {this.props.isFetchingValidation
            ?
            <div className='validating-wrapper'>
              <Spinner />
              <p className='validation-message'>
                Validating invite code...
              </p>
            </div>
            :
            this.props.isInviteCodeValid
              ?
              this.renderValidCodeContent()
              :
              <p className='error'>Invalid Invite Code</p>
          }
        </div>
      </div>
    );
  }
}
