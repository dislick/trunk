import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { registerActions } from '../features/register';
import { RegisterPage } from '../pages/register_page';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  email: state.registerReducer.email,
  username: state.registerReducer.username,
  password: state.registerReducer.password,
  isInviteCodeValid: state.registerReducer.isInviteCodeValid,
  invitedBy: state.registerReducer.invitedBy,
  isFetchingValidation: state.registerReducer.isFetchingValidation,
  isFetchingRegister: state.registerReducer.isFetchingRegister,
  registerErrorMessage: state.registerReducer.registerErrorMessage,
});

export const RegisterPageConnected = withRouter(connect(mapStateToProps, {
  onChangeEmail: registerActions.setEmail,
  onChangeUsername: registerActions.setUsername,
  onChangePassword: registerActions.setPassword,
  onValidateCode: registerActions.validateInviteCode,
  onSubmit: registerActions.registerUser,
})(RegisterPage));
