import { PostsAction } from './actions';
import { FETCH_POSTS_SUCCESS, SELECT_POST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_REQUEST, FETCH_DETAIL_FAILURE } from './constants';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentDetailDTO, CommentDTO, RatingDTO } from '../../../server/controllers/torrent_detail_controller';
import { concat, sortBy } from 'lodash';

export interface PostsState {
  readonly posts: TorrentResponseDTO[];
  readonly selectedPostHash: string;
  readonly detail: {
    averageRating: number;
    interactions: Array<CommentDTO | RatingDTO>;
  };
  readonly isDetailFetching: boolean;
  readonly reachedEndOfPosts: boolean;
}

const defaultState: PostsState = {
  posts: [],
  selectedPostHash: null,
  detail: {
    interactions: [],
    averageRating: null,
  },
  isDetailFetching: false,
  reachedEndOfPosts: false,
}

export default (state: PostsState = defaultState, action: PostsAction): PostsState => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      if (action.replacePosts) {
        return { ...state, posts: action.posts };
      }
      let merged = mergeAndDedupePosts(state.posts, action.posts);
      return {
        ...state,
        reachedEndOfPosts: merged.length === state.posts.length,
        posts: merged,
      };
    case SELECT_POST:
      return { ...state, selectedPostHash: action.payload };
    case FETCH_DETAIL_REQUEST:
      return { ...state, isDetailFetching: true };
    case FETCH_DETAIL_SUCCESS:
      let interactions = sortBy([...action.detail.comments, ...action.detail.ratings], i => i.timestamp);
      return {
        ...state,
        detail: {
          averageRating: action.detail.averageRating,
          interactions: interactions,
        },
        isDetailFetching: false
      };
    case FETCH_DETAIL_FAILURE:
      return { ...state, isDetailFetching: false };
  }

  return state;
};

const mergeAndDedupePosts = (oldPosts: TorrentResponseDTO[], newPosts: TorrentResponseDTO[]) => {
  let posts = [ ...oldPosts ];
  for (let newPost of newPosts) {
    if (!posts.some(p => p.hash === newPost.hash)) {
      posts.push(newPost);
    }
  }
  return posts;
};
