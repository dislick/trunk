import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { authReducer } from './features/auth';
import { postsReducer } from './features/posts';

const rootReducer = combineReducers({
  authReducer,
  postsReducer,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
