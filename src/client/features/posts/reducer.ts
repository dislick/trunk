import { PostsAction } from './actions';
import { FETCH_POSTS_SUCCESS, SELECT_POST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_REQUEST, FETCH_DETAIL_FAILURE } from './constants';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentDetailDTO } from '../../../server/controllers/torrent_detail_controller';

export interface PostsState {
  readonly posts: TorrentResponseDTO[];
  readonly selectedPostHash: string;
  readonly detail: TorrentDetailDTO;
  readonly isDetailFetching: boolean;
}

const defaultState: PostsState = {
  posts: [],
  selectedPostHash: null,
  detail: {
    comments: [],
    ratings: [],
    averageRating: null,  
  },
  isDetailFetching: false,
}

export default (state: PostsState = defaultState, action: PostsAction): PostsState => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.posts };
    case SELECT_POST:
      return { ...state, selectedPostHash: action.payload };
    case FETCH_DETAIL_REQUEST:
      return { ...state, isDetailFetching: true };
    case FETCH_DETAIL_SUCCESS:
      return { ...state, detail: action.detail, isDetailFetching: false };
    case FETCH_DETAIL_FAILURE:
      return { ...state, isDetailFetching: false };
  }

  return state;
};
