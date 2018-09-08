import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { authReducer } from './features/auth';
import { postsReducer } from './features/posts';
import { uploadReducer } from './features/upload';

const rootReducer = combineReducers({
  authReducer,
  postsReducer,
  uploadReducer,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
