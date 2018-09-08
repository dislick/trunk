import * as React from 'react';
import { TagList } from '../tag_list';
import * as moment from 'moment';
import { Username } from '../username';
import * as classnames from 'classnames';
import { Tag } from '../tag';
import * as bytes from 'bytes';

import './torrent_list_entry.scss';

interface Props {
  hash: string;
  title: string;
  size: number;
  uploadedAt: Date;
  tags: string | null;
  seeders: number;
  leechers: number;
  username: string;
  userratio: string;
  selected: boolean;
  onClick: () => void;
}

interface UploadInfoProps {
  username: string;
  userratio: string;
  uploadedAt: Date;
}

export const UploadInfo = (props: UploadInfoProps) => (
  <p className="upload-info">
    uploaded by <Username ratio={props.userratio}>{props.username}</Username> {moment(props.uploadedAt).fromNow()}
  </p>
);

export const TorrentListEntry = (props: Props) => (
  <div
    className={classnames('torrent-list-entry', {
      'selected': props.selected,
    })}
    onClick={props.onClick}
  >
    <h1>{props.title}</h1>
    <div className="tag-list">
      <Tag systemTag>{bytes(props.size, { unitSeparator: ' ' })}</Tag>
      <TagList list={props.tags} />
    </div>
    <div className="bottom-text">
      <UploadInfo {...props} />
      <div className='seeders-leechers'>
        <img src={require('../../assets/keyboard-arrow-up.svg')} /> <span className='seeders'>{props.seeders}</span>
        <img src={require('../../assets/keyboard-arrow-down.svg')} /> <span className='leechers'>{props.leechers}</span>
      </div>
    </div>

    {props.selected && <div className='triangle' />}
  </div>
);
