import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, SELECT_POST, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_FAILURE
} from './constants';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../reducer';
import { fetchPostsFromServer, fetchDetailFromServer } from './services';
import { push } from 'connected-react-router';
import { authServices } from '../auth';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentDetailDTO } from '../../../server/controllers/torrent_detail_controller';

export interface PostsAction extends Action {
  payload: string;
  posts: TorrentResponseDTO[];
  detail: TorrentDetailDTO;
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

export const fetchDetail = (hash: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: FETCH_DETAIL_REQUEST
  });
  const response = await fetchDetailFromServer(hash);
  if (response.ok) {
    dispatch({ type: FETCH_DETAIL_SUCCESS, detail: await response.json() });
  } else {
    dispatch({ type: FETCH_DETAIL_FAILURE });
  }
};

export const logout = () => async (dispatch: Dispatch, getState: () => RootState) => {
  await authServices.logoutUser();
  dispatch(push('/login'));
};

export const selectPost = (hash: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: SELECT_POST,
    payload: hash
  });
  dispatch(fetchDetail(hash) as any);
};
