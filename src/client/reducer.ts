import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { authReducer } from './features/auth';
import { postsReducer } from './features/posts';
import { registerReducer } from './features/register';
import { uploadReducer } from './features/upload';

const rootReducer = combineReducers({
  authReducer,
  postsReducer,
  uploadReducer,
  registerReducer,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
