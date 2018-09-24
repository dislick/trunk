import { connect } from 'react-redux';
import { TorrentUploadArea } from '../components/torrent_list/torrent_upload_area';
import { uploadActions } from '../features/upload';
import { RootState } from '../reducer';

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
