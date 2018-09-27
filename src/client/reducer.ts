import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import authReducer from './features/auth/reducer';
import postsReducer from './features/posts/reducer';
import registerReducer from './features/register/reducer';
import uploadReducer from './features/upload/reducer';

const rootReducer = combineReducers({
  authReducer,
  postsReducer,
  uploadReducer,
  registerReducer,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
