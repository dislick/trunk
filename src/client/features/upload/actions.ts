import {
  ADD_FILE_FOR_UPLOAD, DISCARD_FILE, UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE
} from './constants';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../reducer';
import { uploadTorrentFile } from './services';
import { push } from 'connected-react-router';
import { authServices } from '../auth';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { postsActions } from '../posts';

export interface UploadAction extends Action {
  file: File;
  title: string;
  index: number;
}

export const addFileForUpload = (file: File, title: string) => ({
  type: ADD_FILE_FOR_UPLOAD,
  file,
  title
});

export const uploadFile = (index: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({ type: UPLOAD_FILE_REQUEST, index });

  let fileToUpload = getState().uploadReducer.files[index];
  
  let formData = new FormData();
  formData.append('torrent_file', fileToUpload.file);
  formData.append('title', fileToUpload.title);
  formData.append('tags', fileToUpload.tags);

  let response = await uploadTorrentFile(formData);

  if (response.ok) {
    dispatch({ type: UPLOAD_FILE_SUCCESS, index });
  } else {
    dispatch({ type: UPLOAD_FILE_FAILURE, index });
  }
};

export const discardFile = (index: number) => ({
  type: DISCARD_FILE,
  index
});
