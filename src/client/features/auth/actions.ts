import {
  SET_USERNAME,
  SET_PASSWORD,
  SUBMIT_LOGIN_REQUEST,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_FAILURE,
  FETCH_PERSONAL_INFO_REQUEST,
  FETCH_PERSONAL_INFO_SUCCESS,
  FETCH_PERSONAL_INFO_FAILURE
} from './constants';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../reducer';
import { loginUser, getPersonalInfo } from './services';
import { push } from 'connected-react-router';
import { authServices } from '../auth';
import { PersonalInfoDTO } from '../../../server/controllers/login_controller';

export interface AuthAction extends Action {
  payload?: string;
  personalInfo?: PersonalInfoDTO;
}

export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: username
});
export const setPassword = (password: string) => ({
  type: SET_PASSWORD,
  payload: password
});

export const submitLoginRequest = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({ type: SUBMIT_LOGIN_REQUEST });

  const { username, password } = getState().authReducer;
  const response = await loginUser(username, password);

  if (response.ok) {
    dispatch({ type: SUBMIT_LOGIN_SUCCESS });
    dispatch(push('/'));
  } else {
    dispatch({ type: SUBMIT_LOGIN_FAILURE });
  }
};

export const logout = () => async (dispatch: Dispatch, getState: () => RootState) => {
  await authServices.logoutUser();
  dispatch(push('/login'));
};

export const fetchPersonalInfo = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({ type: FETCH_PERSONAL_INFO_REQUEST });
  
  const response = await getPersonalInfo();

  if (response.ok) {
    let body: PersonalInfoDTO = await response.json();

    dispatch({ type: FETCH_PERSONAL_INFO_SUCCESS, personalInfo: body });
  } else {
    dispatch({ type: FETCH_PERSONAL_INFO_FAILURE });
  }
};