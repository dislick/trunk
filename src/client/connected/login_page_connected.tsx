import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { LoginPage } from '../pages/login_page';
import { authActions } from '../features/auth';

const mapStateToProps = (state: RootState) => ({
  username: state.authReducer.login.username,
  password: state.authReducer.login.password,
});

export const LoginPageConnected = connect(mapStateToProps, {
  onChangeUsername: authActions.setUsername,
  onChangePassword: authActions.setPassword,
})(LoginPage);
