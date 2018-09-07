import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { postsActions } from '../features/posts';
import { TorrentDetail } from '../components/torrent_detail';

const mapStateToProps = (state: RootState) => ({
  visible: !!state.postsReducer.selectedPostHash,
});

export const TorrentDetailConnected = connect(mapStateToProps, {
  
})(TorrentDetail);
