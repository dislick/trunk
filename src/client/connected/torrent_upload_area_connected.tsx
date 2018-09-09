import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { uploadActions } from '../features/upload';
import { TorrentUploadArea } from '../components/torrent_list/torrent_upload_area';

const mapStateToProps = (state: RootState) => ({
  files: state.uploadReducer.files,
});

export const TorrentUploadAreaConnected = connect(mapStateToProps, {
  onFileSelect: uploadActions.addFileForUpload,
  onUploadFile: uploadActions.uploadFile,
  onDiscardFile: uploadActions.discardFile,
  onEditTitle: uploadActions.editTorrentTitle,
  onEditTags: uploadActions.editTorrentTags,
})(TorrentUploadArea);
