import { combineEpics } from 'redux-observable';
import { authEpics } from './features/auth';

export const rootEpic = combineEpics(
  authEpics.fetchLoginEpic,
);
