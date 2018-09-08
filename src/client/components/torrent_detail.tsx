import * as React from 'react';
import * as classnames from 'classnames';
import { TorrentResponseDTO } from '../../server/controllers/torrent_controller';
import { UploadInfo } from './torrent_list/torrent_list_entry';
import { Tag } from './tag';
import { TagList } from './tag_list';
import * as bytes from 'bytes';

import './torrent_detail.scss';

interface Props {
  visible: boolean;
  post: TorrentResponseDTO;
}

export const TorrentDetail = (props: Props) => {
  return (
    <section className={classnames('torrent-detail', {
      'hide-detail': !props.visible
    })}>
      <div className="torrent-detail-inner">
        {props.post &&
          <>
            <div className="title-wrapper">
              <h1>{props.post.title}</h1>
              <img src={require('../assets/download-icon.svg')} className='download-button' />
            </div>
            <div className="tag-list">
              <Tag systemTag>{bytes(props.post.size, { unitSeparator: ' ' })}</Tag>
              <TagList list={props.post.tags} />
            </div>

            <UploadInfo
              username={props.post.user.username}
              userratio={props.post.user.ratio}
              uploadedAt={props.post.uploaded_at}
            />
          </>
        }
      </div>
    </section>
  )
};
