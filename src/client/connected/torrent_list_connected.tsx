import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { postsActions } from '../features/posts';
import { TorrentList } from '../components/torrent_list/torrent_list';
import { uploadActions } from '../features/upload';

const mapStateToProps = (state: RootState) => ({
  posts: state.postsReducer.posts,
  selectedPost: state.postsReducer.selectedPostHash,
  files: state.uploadReducer.files,
});

export const TorrentListConnected = connect(mapStateToProps, {
  onSelectPost: postsActions.selectPost,
  onFileSelect: uploadActions.addFileForUpload,
  onUploadFile: uploadActions.uploadFile,
  onDiscardFile: uploadActions.discardFile,
})(TorrentList);
