import * as React from 'react';
import { TagList } from '../tag_list';
import * as moment from 'moment';
import { Username } from '../username';

import './torrent_list_entry.scss';

interface Props {
  hash: string;
  title: string;
  size: number;
  uploadedAt: Date;
  tags: string | null;
  username: string;
  userratio: string;
}

export const TorrentListEntry = (props: Props) => (
  <div className='torrent-list-entry'>
    <h1>{props.title}</h1>
    <div className="tag-list">
      <TagList list={props.tags} />
    </div>
    <p className="upload-info">
      uploaded by <Username ratio={props.userratio}>{props.username}</Username> {moment(props.uploadedAt).fromNow()}
    </p>
  </div>
);
