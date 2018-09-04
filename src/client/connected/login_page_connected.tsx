import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { LoginPage } from '../pages/login_page';
import { authActions } from '../features/auth';

const mapStateToProps = (state: RootState) => ({
  username: state.authReducer.username,
  password: state.authReducer.password,
  providedInvalidCredentials: state.authReducer.invalidCredentials,
  isFetching: state.authReducer.isFetching
});

export const LoginPageConnected = connect(mapStateToProps, {
  onChangeUsername: authActions.setUsername,
  onChangePassword: authActions.setPassword,
  onSubmit: authActions.submitLoginRequest,
})(LoginPage);
