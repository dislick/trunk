import * as React from 'react';
import Dropzone from 'react-dropzone'
import { FileToUpload } from '../../features/upload/reducer';
import { TextField } from '../textfield';

import './torrent_upload_area.scss';
import { Button } from '../button';

interface Props {
  files: FileToUpload[];
  onFileSelect: (file: File, title: string) => void;
  onUploadFile: (index: number) => void;
  onDiscardFile: (index: number) => void;
  onEditTitle: (index: number, title: string) => void;
  onEditTags: (index: number, tags: string) => void;
}

export const TorrentUploadArea = (props: Props) => {
  const onDrop = (files) => {
    files.forEach((file) => {
      let name = file.name.replace(/\.torrent$/, '');
      props.onFileSelect(file, name);
    });
  }

  return (
    <div className="upload-area-wrapper">
      {props.files.length <= 0 &&
        <Dropzone
          onDrop={onDrop}
          accept='application/x-bittorrent'
          className='torrent-upload-area'
          activeClassName='active'
          rejectClassName='reject'
        >
          <p>Drag Torrent File Here</p>
        </Dropzone>
      }
      {props.files.map((file, index) => (
        <div className='file-to-upload' key={index}>
          <TextField
            value={file.title}
            placeholder='Title'
            onChange={(event) => props.onEditTitle(index, event.target.value)}
            className='title'
          />
          <TextField
            value={file.tags}
            placeholder='Comma-separated tags'
            onChange={(event) => props.onEditTags(index, event.target.value)}
            className='tags'
          />
          <Button className='publish' onClick={() => props.onUploadFile(index)}>Publish Torrent</Button>
          <Button danger onClick={() => props.onDiscardFile(index)}>Discard</Button>
        </div>
      ))}
    </div>
  );
}