import { UploadAction } from './actions';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { ADD_FILE_FOR_UPLOAD, DISCARD_FILE, UPLOAD_FILE_SUCCESS, EDIT_TORRENT_TITLE, EDIT_TORRENT_TAGS, UPLOAD_FILE_FAILURE } from './constants';
import update from 'immutability-helper';

export interface FileToUpload {
  file: File;
  title: string;
  tags: string;
  errorMessage: string;
}

export interface UploadState {
  readonly files: FileToUpload[]
}

const defaultState: UploadState = {
  files: [],
}

export default (state: UploadState = defaultState, action: UploadAction): UploadState => {
  switch (action.type) {
    case ADD_FILE_FOR_UPLOAD:
      return {
        ...state,
        files: [
          ...state.files,
          {
            file: action.file,
            title: action.title,
            tags: '',
            errorMessage: '',
          }
        ]
      };
    case DISCARD_FILE:
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.filter((f, index) => index !== action.index),
      };
    case EDIT_TORRENT_TITLE:
      return update(state, {
        files: {
          $apply: file => file.map((item: FileToUpload, index) => {
            if (index === action.index) {
              return { ...item, title: action.title, errorMessage: '' };
            }
            return item;
          }),
        },
      });
    case EDIT_TORRENT_TAGS:
      return update(state, {
        files: {
          $apply: file => file.map((item: FileToUpload, index) => {
            if (index === action.index) {
              return { ...item, tags: action.tags, errorMessage: '' };
            }
            return item;
          }),
        },
      });
    case UPLOAD_FILE_FAILURE:
    return update(state, {
      files: {
        $apply: file => file.map((item: FileToUpload, index) => {
          if (index === action.index) {
            return { ...item, errorMessage: action.message };
          }
          return item;
        }),
      },
    });
  }

  return state;
};
