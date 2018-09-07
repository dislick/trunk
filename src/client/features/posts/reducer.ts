import { PostsAction } from './actions';
import { FETCH_POSTS_SUCCESS, SELECT_POST } from './constants';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';

export interface PostsState {
  readonly posts: TorrentResponseDTO[];
  readonly selectedPostHash: string;
}

const defaultState: PostsState = {
  posts: [],
  selectedPostHash: null,
}

export default (state: PostsState = defaultState, action: PostsAction): PostsState => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.posts };
    case SELECT_POST:
      return { ...state, selectedPostHash: action.payload };
  }

  return state;
};
