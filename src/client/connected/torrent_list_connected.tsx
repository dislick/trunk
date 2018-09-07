import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { postsActions } from '../features/posts';
import { TorrentList } from '../components/torrent_list/torrent_list';

const mapStateToProps = (state: RootState) => ({
  posts: state.postsReducer.posts,
  selectedPost: state.postsReducer.selectedPostHash,
});

export const TorrentListConnected = connect(mapStateToProps, {
  onSelectPost: postsActions.selectPost,
})(TorrentList);
