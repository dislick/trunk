import { action } from 'typesafe-actions';
import { SET_USERNAME, SET_PASSWORD } from './constants';

export const setUsername = (username: string) => action(SET_USERNAME, username);
export const setPassword = (password: string) => action(SET_PASSWORD, password);
