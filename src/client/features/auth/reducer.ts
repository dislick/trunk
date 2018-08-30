import { ActionType } from 'typesafe-actions';
import * as authActions from './actions';
import { combineReducers } from 'redux';
import { SET_USERNAME, SET_PASSWORD, SUBMIT_LOGIN_SUCCESS } from './constants';

export type AuthActions = ActionType<typeof authActions>;

export interface AuthState {
  login: {
    readonly username: string;
    readonly password: string;
  }
}

const defaultState = {
  username: '',
  password: '',
}

export default combineReducers<AuthState, AuthActions>({
  login: (state = defaultState, action) => {
    switch (action.type) {
      case SET_USERNAME:
        return { ...state, username: action.payload };
      case SET_PASSWORD:
        return { ...state, password: action.payload };
      case SUBMIT_LOGIN_SUCCESS:
        return { ...state, username: action.payload.id.toString() };
    }

    return state;
  }
});
