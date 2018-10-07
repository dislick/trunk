import { Action, Dispatch } from 'redux';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentDetailDTO } from '../../../server/controllers/torrent_detail_controller';
import { RootState } from '../../reducer';
import {
  EXECUTE_SEARCH,
  FETCH_DETAIL_FAILURE,
  FETCH_DETAIL_REQUEST,
  FETCH_DETAIL_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  SELECT_POST,
  SET_COMMENT,
  SET_SEARCH_QUERY,
} from './constants';
import { addCommentOnServer, fetchDetailFromServer, fetchPostsFromServer, updateRatingOnServer } from './services';

export interface PostsAction extends Action {
  payload?: string;
  posts?: TorrentResponseDTO[];
  detail?: TorrentDetailDTO;
  replacePosts?: boolean;
}

export const fetchPosts = (refresh: boolean = false) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: FETCH_POSTS_REQUEST,
  });

  let { posts, searchQuery } = getState().postsReducer;
  let offset;
  if (posts.length > 0 && !refresh) {
    offset = posts[posts.length - 1].uploaded_at;
  }

  const response = await fetchPostsFromServer(offset, searchQuery);

  if (response.ok) {
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      posts: await response.json(),
      replacePosts: refresh,
    });
  } else {
    dispatch({ type: FETCH_POSTS_FAILURE });
  }
};

export const fetchDetail = (hash: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: FETCH_DETAIL_REQUEST,
  });
  const response = await fetchDetailFromServer(hash);
  if (response.ok) {
    dispatch({ type: FETCH_DETAIL_SUCCESS, detail: await response.json() });
  } else {
    dispatch({ type: FETCH_DETAIL_FAILURE });
  }
};

export const selectPost = (hash: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: SELECT_POST,
    payload: hash,
  });
  dispatch(fetchDetail(hash) as any);
};

export const setComment = (comment: string): PostsAction => ({
  type: SET_COMMENT,
  payload: comment,
});

export const setSearchQuery = (query: string): PostsAction => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const executeSearch = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({ type: EXECUTE_SEARCH });
  dispatch(fetchPosts() as any);
};

export const postComment = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: POST_COMMENT_REQUEST,
  });

  const postState = getState().postsReducer;
  const response = await addCommentOnServer(postState.selectedPostHash, postState.detail.commentInput);

  if (response.ok) {
    dispatch({ type: POST_COMMENT_SUCCESS });
    dispatch(fetchDetail(postState.selectedPostHash) as any);
  } else {
    dispatch({ type: POST_COMMENT_FAILURE });
  }
};

export const postRating = (rating: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  const postState = getState().postsReducer;
  const response = await updateRatingOnServer(postState.selectedPostHash, rating);

  if (response.ok) {
    dispatch(fetchDetail(postState.selectedPostHash) as any);
  }
};
