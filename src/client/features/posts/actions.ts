import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  SELECT_POST,
  FETCH_DETAIL_REQUEST,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_FAILURE,
  SET_COMMENT,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} from './constants';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../reducer';
import { fetchPostsFromServer, fetchDetailFromServer, addCommentOnServer, updateRatingOnServer } from './services';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentDetailDTO } from '../../../server/controllers/torrent_detail_controller';

export interface PostsAction extends Action {
  payload?: string;
  posts?: TorrentResponseDTO[];
  detail?: TorrentDetailDTO;
  replacePosts?: boolean;
}

export const fetchPosts = (refresh: boolean = false) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: FETCH_POSTS_REQUEST
  });

  let posts = getState().postsReducer.posts;
  let offset;
  if (posts.length > 0 && !refresh) {
    offset = posts[posts.length - 1].uploaded_at;
  }

  const response = await fetchPostsFromServer(offset);

  if (response.ok) {
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      posts: await response.json(),
      replacePosts: refresh
    });
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

export const selectPost = (hash: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: SELECT_POST,
    payload: hash
  });
  dispatch(fetchDetail(hash) as any);
};

export const setComment = (comment: string): PostsAction => ({
  type: SET_COMMENT,
  payload: comment,
});

export const postComment = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: POST_COMMENT_REQUEST
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
    //dispatch({ type: POST_COMMENT_SUCCESS });
    dispatch(fetchDetail(postState.selectedPostHash) as any);
  } else {
    //dispatch({ type: POST_COMMENT_FAILURE });
  }
};
