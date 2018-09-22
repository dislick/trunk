import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { postsActions } from '../features/posts';
import { TorrentList } from '../components/torrent_list/torrent_list';
import { uploadActions } from '../features/upload';

const mapStateToProps = (state: RootState) => ({
  posts: state.postsReducer.posts,
  selectedPost: state.postsReducer.selectedPostHash,
  reachedEndOfPosts: state.postsReducer.reachedEndOfPosts,
});

export const TorrentListConnected = connect(mapStateToProps, {
  onSelectPost: postsActions.selectPost,
  onRequestMorePosts: postsActions.fetchPosts,
})(TorrentList);
