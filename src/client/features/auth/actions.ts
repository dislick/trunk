import { action, createAsyncAction } from 'typesafe-actions';
import { SET_USERNAME, SET_PASSWORD, SUBMIT_LOGIN_REQUEST, SUBMIT_LOGIN_SUCCESS, SUBMIT_LOGIN_FAILURE } from './constants';

export const setUsername = (username: string) => action(SET_USERNAME, username);
export const setPassword = (password: string) => action(SET_PASSWORD, password);

export const submitLogin = createAsyncAction(
  SUBMIT_LOGIN_REQUEST,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_FAILURE
)<void, { id: number }, Error>();
