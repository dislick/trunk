import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { postsActions } from '../features/posts';
import { TorrentDetail } from '../components/torrent_detail/torrent_detail';
import { find } from 'lodash';

const mapStateToProps = (state: RootState) => ({
  visible: !!state.postsReducer.selectedPostHash,
  post: find(state.postsReducer.posts, p => p.hash === state.postsReducer.selectedPostHash),
  detail: state.postsReducer.detail,
  isDetailFetching: state.postsReducer.isDetailFetching,
});

export const TorrentDetailConnected = connect(mapStateToProps, {
  onSetComment: postsActions.setComment,
  onPostComment: postsActions.postComment,
  onUpdateRating: postsActions.postRating,
})(TorrentDetail);
