import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { TorrentList } from '../components/torrent_list/torrent_list';
import { postsActions } from '../features/posts';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  posts: state.postsReducer.posts,
  selectedPost: state.postsReducer.selectedPostHash,
  reachedEndOfPosts: state.postsReducer.reachedEndOfPosts,
  searchQuery: state.postsReducer.searchQuery,
});

export const TorrentListConnected = withRouter(connect(mapStateToProps, {
  onSelectPost: postsActions.selectPost,
  onRequestMorePosts: postsActions.fetchPosts,
})(TorrentList));
