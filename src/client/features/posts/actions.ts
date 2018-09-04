import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE
} from './constants';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../reducer';
import { fetchPostsFromServer } from './services';
import { push } from 'connected-react-router';
import { authServices } from '../auth';

export interface PostsAction extends Action {
  payload: string;
}

export const fetchPosts = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: FETCH_POSTS_REQUEST
  });
  try {
    const posts = await fetchPostsFromServer();
    dispatch({ type: FETCH_POSTS_SUCCESS });
  } catch (ex) {
    dispatch({ type: FETCH_POSTS_FAILURE });
    dispatch(push('/login'));
  }
};

export const logout = () => async (dispatch: Dispatch, getState: () => RootState) => {
  await authServices.logoutUser();
  dispatch(push('/login'));
};