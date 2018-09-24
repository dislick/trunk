import { find } from 'lodash';
import { connect } from 'react-redux';
import { TorrentDetail } from '../components/torrent_detail/torrent_detail';
import { postsActions } from '../features/posts';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  visible: !!state.postsReducer.selectedPostHash,
  post: find(state.postsReducer.posts, (p) => p.hash === state.postsReducer.selectedPostHash),
  detail: state.postsReducer.detail,
  isDetailFetching: state.postsReducer.isDetailFetching,
});

export const TorrentDetailConnected = connect(mapStateToProps, {
  onSetComment: postsActions.setComment,
  onPostComment: postsActions.postComment,
  onUpdateRating: postsActions.postRating,
})(TorrentDetail);
