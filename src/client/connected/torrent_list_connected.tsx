import { connect } from 'react-redux';
import { TorrentList } from '../components/torrent_list/torrent_list';
import { postsActions } from '../features/posts';
import { uploadActions } from '../features/upload';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  posts: state.postsReducer.posts,
  selectedPost: state.postsReducer.selectedPostHash,
  reachedEndOfPosts: state.postsReducer.reachedEndOfPosts,
});

export const TorrentListConnected = connect(mapStateToProps, {
  onSelectPost: postsActions.selectPost,
  onRequestMorePosts: postsActions.fetchPosts,
})(TorrentList);
