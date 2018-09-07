import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, SELECT_POST
} from './constants';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../reducer';
import { fetchPostsFromServer } from './services';
import { push } from 'connected-react-router';
import { authServices } from '../auth';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';

export interface PostsAction extends Action {
  payload: string;
  posts: TorrentResponseDTO[];
}

export const fetchPosts = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: FETCH_POSTS_REQUEST
  });
  const response = await fetchPostsFromServer();
  if (response.ok) {
    dispatch({ type: FETCH_POSTS_SUCCESS, posts: await response.json() });
  } else {
    dispatch({ type: FETCH_POSTS_FAILURE });
  }
};

export const logout = () => async (dispatch: Dispatch, getState: () => RootState) => {
  await authServices.logoutUser();
  dispatch(push('/login'));
};

export const selectPost = (hash: string) => ({ type: SELECT_POST, payload: hash });
