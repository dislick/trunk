import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import authReducer, { AuthActions } from './features/auth/reducer';

const rootReducer = combineReducers({
  authReducer,
});

export type RootState = StateType<typeof rootReducer>;
export type RootAction = AuthActions;

export default rootReducer;
