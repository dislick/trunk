import { sortBy } from 'lodash';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { CommentDTO, RatingDTO } from '../../../server/controllers/torrent_detail_controller';
import { PostsAction } from './actions';
import { FETCH_DETAIL_FAILURE, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_POSTS_SUCCESS, POST_COMMENT_SUCCESS, SELECT_POST, SET_COMMENT } from './constants';

export interface PostsState {
  readonly posts: TorrentResponseDTO[];
  readonly selectedPostHash: string;
  readonly detail: PostDetailState;
  readonly isDetailFetching: boolean;
  readonly reachedEndOfPosts: boolean;
}

export interface PostDetailState {
  averageRating: number;
  myRating: number;
  interactions: Array<CommentDTO | RatingDTO>;
  commentInput: string;
}

const defaultState: PostsState = {
  posts: [],
  selectedPostHash: null,
  detail: {
    interactions: [],
    averageRating: null,
    myRating: null,
    commentInput: '',
  },
  isDetailFetching: false,
  reachedEndOfPosts: false,
};

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
      return { ...state, isDetailFetching: true /*detail: { ...defaultState.detail }*/ };
    case FETCH_DETAIL_SUCCESS:
      let interactions = sortBy([...action.detail.comments, ...action.detail.ratings], (i) => {
        let date = new Date(i.timestamp);
        return date.getTime();
      });
      return {
        ...state,
        detail: {
          averageRating: action.detail.averageRating,
          myRating: action.detail.myRating,
          interactions,
          commentInput: '',
        },
        isDetailFetching: false,
      };
    case FETCH_DETAIL_FAILURE:
      return { ...state, isDetailFetching: false };
    case SET_COMMENT:
      return { ...state, detail: { ...state.detail, commentInput: action.payload } };
    case POST_COMMENT_SUCCESS:
      return { ...state, detail: { ...state.detail, commentInput: '' } };
  }

  return state;
};

const mergeAndDedupePosts = (oldPosts: TorrentResponseDTO[], newPosts: TorrentResponseDTO[]) => {
  let posts = [ ...oldPosts ];
  for (let newPost of newPosts) {
    if (!posts.some((p) => p.hash === newPost.hash)) {
      posts.push(newPost);
    }
  }
  return posts;
};
