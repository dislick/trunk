import {
  ADD_FILE_FOR_UPLOAD, DISCARD_FILE, UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE, EDIT_TORRENT_TITLE, EDIT_TORRENT_TAGS
} from './constants';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../reducer';
import { uploadTorrentFile } from './services';
import { postsActions } from '../posts';
import { SELECT_POST } from '../posts/constants';
import { selectPost } from '../posts/actions';

export interface UploadAction extends Action {
  file: File;
  title: string;
  tags: string;
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
    const hash = (await response.json()).hash;

    dispatch({ type: UPLOAD_FILE_SUCCESS, index });
    dispatch(postsActions.fetchPosts() as any);
    dispatch(selectPost(hash));
  } else {
    dispatch({ type: UPLOAD_FILE_FAILURE, index });
  }
};

export const discardFile = (index: number) => ({
  type: DISCARD_FILE,
  index
});

export const editTorrentTitle = (index: number, title: string) => ({
  type: EDIT_TORRENT_TITLE,
  index,
  title
});

export const editTorrentTags = (index: number, tags: string) => ({
  type: EDIT_TORRENT_TAGS,
  index,
  tags
});