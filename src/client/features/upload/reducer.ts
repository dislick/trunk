import { UploadAction } from './actions';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { ADD_FILE_FOR_UPLOAD, DISCARD_FILE, UPLOAD_FILE_SUCCESS } from './constants';

export interface FileToUpload {
  file: File;
  title: string;
  tags: string;
}

export interface UploadState {
  readonly files: FileToUpload[];
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
          }
        ]
      };
    case DISCARD_FILE:
    case UPLOAD_FILE_SUCCESS:
      return { ...state, files: state.files.filter((file, index) => index !== action.index )};
    
  }

  return state;
};
