import { PersonalInfoDTO } from '../../../server/controllers/login_controller';
import { AuthAction } from './actions';
import {
  FETCH_PERSONAL_INFO_SUCCESS,
  SET_PASSWORD,
  SET_USERNAME,
  SUBMIT_LOGIN_FAILURE,
  SUBMIT_LOGIN_REQUEST,
  SUBMIT_LOGIN_SUCCESS,
} from './constants';

export interface AuthState {
  readonly username: string;
  readonly password: string;
  readonly isAuthenticated: boolean;
  readonly invalidCredentials: boolean;
  readonly isFetching: boolean;
  readonly personalInfo: PersonalInfoDTO;
}

const defaultState: AuthState = {
  username: '',
  password: '',
  isAuthenticated: false,
  invalidCredentials: false,
  isFetching: false,
  personalInfo: null,
};

export default (state: AuthState = defaultState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SUBMIT_LOGIN_REQUEST:
      return { ...state, isFetching: true, invalidCredentials: false };
    case SUBMIT_LOGIN_FAILURE:
      return { ...state, isAuthenticated: false, invalidCredentials: true, isFetching: false };
    case SUBMIT_LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, invalidCredentials: false, isFetching: false, password: '' };
    case FETCH_PERSONAL_INFO_SUCCESS:
      return { ...state, personalInfo: action.personalInfo };
  }

  return state;
};
