import { push } from 'connected-react-router';
import { Action, Dispatch } from 'redux';
import { ValidationResponseDTO } from '../../../server/controllers/login_controller';
import { RootState } from '../../reducer';
import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_USERNAME,
  SUBMIT_REGISTER_FAILURE,
  SUBMIT_REGISTER_REQUEST,
  SUBMIT_REGISTER_SUCCESS,
  SUBMIT_VALIDATION_FAILURE,
  SUBMIT_VALIDATION_REQUEST,
  SUBMIT_VALIDATION_SUCCESS,
} from './constants';
import { registerUserService, validateCodeService } from './services';

export interface RegisterAction extends Action {
  payload: string;
}

export const setEmail = (email: string) => ({
  type: SET_EMAIL,
  payload: email,
});
export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: username,
});
export const setPassword = (password: string) => ({
  type: SET_PASSWORD,
  payload: password,
});

export const validateInviteCode = (inviteCode: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: SUBMIT_VALIDATION_REQUEST,
  });
  const response = await validateCodeService(inviteCode);

  if (response.ok) {
    let body: ValidationResponseDTO = await response.json();

    if (body.isValid) {
      dispatch({ type: SUBMIT_VALIDATION_SUCCESS, payload: body.username });
    } else {
      dispatch({ type: SUBMIT_VALIDATION_FAILURE });
    }
  } else {
    dispatch({ type: SUBMIT_VALIDATION_FAILURE });
  }
};

export const registerUser = (inviteCode: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: SUBMIT_REGISTER_REQUEST,
  });
  const { email, username, password } = getState().registerReducer;
  const response = await registerUserService(email, username, password, inviteCode);

  if (response.ok) {
    dispatch({ type: SUBMIT_REGISTER_SUCCESS });
    dispatch(push('/'));
  } else {
    let body = await response.json();

    dispatch({ type: SUBMIT_REGISTER_FAILURE, payload: body.message });
  }
};
