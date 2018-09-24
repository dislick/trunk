import { RegisterAction } from './actions';
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

export interface RegisterState {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly isInviteCodeValid: boolean;
  readonly invitedBy: string; // username
  readonly isFetchingValidation: boolean;
  readonly isFetchingRegister: boolean;
  readonly registerErrorMessage: string;
}

const defaultState: RegisterState = {
  email: '',
  username: '',
  password: '',
  isInviteCodeValid: false,
  invitedBy: '',
  isFetchingValidation: false,
  isFetchingRegister: false,
  registerErrorMessage: '',
};

export default (state: RegisterState = defaultState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SUBMIT_VALIDATION_REQUEST:
      return { ...state, isFetchingValidation: true };
    case SUBMIT_VALIDATION_SUCCESS:
      return { ...state, isFetchingValidation: false, isInviteCodeValid: true, invitedBy: action.payload };
    case SUBMIT_VALIDATION_FAILURE:
      return { ...state, isFetchingValidation: false, isInviteCodeValid: false };
    case SUBMIT_REGISTER_REQUEST:
      return { ...state, isFetchingRegister: true };
    case SUBMIT_REGISTER_SUCCESS:
      return { ...defaultState };
    case SUBMIT_REGISTER_FAILURE:
      return { ...state, isFetchingRegister: false, registerErrorMessage: action.payload };
  }

  return state;
};
