import { connect } from 'react-redux';
import { authActions } from '../features/auth';
import { LoginPage } from '../pages/login_page';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  username: state.authReducer.username,
  password: state.authReducer.password,
  providedInvalidCredentials: state.authReducer.invalidCredentials,
  isFetching: state.authReducer.isFetching,
});

export const LoginPageConnected = connect(mapStateToProps, {
  onChangeUsername: authActions.setUsername,
  onChangePassword: authActions.setPassword,
  onSubmit: authActions.submitLoginRequest,
})(LoginPage);
