import { Action, Dispatch } from 'redux';
import { RootState } from '../../reducer';
import { postsActions } from '../posts';
import { selectPost } from '../posts/actions';
import {
  ADD_FILE_FOR_UPLOAD,
  DISCARD_FILE,
  EDIT_TORRENT_TAGS,
  EDIT_TORRENT_TITLE,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,

} from './constants';
import { uploadTorrentFile } from './services';

export interface UploadAction extends Action {
  file: File;
  title: string;
  tags: string;
  index: number;
  message: string;
}

export const addFileForUpload = (file: File, title: string) => ({
  type: ADD_FILE_FOR_UPLOAD,
  file,
  title,
});

export const uploadFile = (index: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({ type: UPLOAD_FILE_REQUEST, index });

  let fileToUpload = getState().uploadReducer.files[index];

  let formData = new FormData();
  formData.append('torrent_file', fileToUpload.file);
  formData.append('title', fileToUpload.title);
  formData.append('tags', fileToUpload.tags);

  let response = await uploadTorrentFile(formData);
  let body = await response.json();

  if (response.ok) {
    dispatch({ type: UPLOAD_FILE_SUCCESS, index });
    dispatch(postsActions.fetchPosts(true) as any);
    dispatch(selectPost(body.hash) as any);
  } else {
    dispatch({
      type: UPLOAD_FILE_FAILURE,
      index,
      message: `HTTP ${response.status} (${response.statusText}): ${body.message}`,
    });
  }
};

export const discardFile = (index: number) => ({
  type: DISCARD_FILE,
  index,
});

export const editTorrentTitle = (index: number, title: string) => ({
  type: EDIT_TORRENT_TITLE,
  index,
  title,
});

export const editTorrentTags = (index: number, tags: string) => ({
  type: EDIT_TORRENT_TAGS,
  index,
  tags,
});
