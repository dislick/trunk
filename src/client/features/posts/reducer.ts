import { PostsAction } from './actions';

export interface PostsState {
  readonly posts: any;
}

const defaultState: PostsState = {
  posts: [],
}

export default (state: PostsState = defaultState, action: PostsAction): PostsState => {
  switch (action.type) {

  }

  return state;
};
