import * as React from 'react';
import * as classnames from 'classnames';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { UploadInfo } from '../torrent_list/torrent_list_entry';
import { Tag } from '../tag';
import { TagList } from '../tag_list';
import * as bytes from 'bytes';
import { getBaseUrl } from '../../api';
import { TorrentDetailDTO } from '../../../server/controllers/torrent_detail_controller';

import './torrent_detail.scss';
import { Spinner } from '../spinner';
import { RatingBar } from './rating_bar';
import { Comment } from './comment';
import { TextField } from '../textfield';
import { Stars } from './stars';

interface Props {
  visible: boolean;
  post: TorrentResponseDTO;
  detail: TorrentDetailDTO;
  isDetailFetching: boolean;
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
              <a href={getBaseUrl() + '/api/torrent/' + props.post.hash}>
                <img src={require('../../assets/download-icon.svg')} className='download-button' />
              </a>
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

            {/* <div className="spinner-wrapper">
              {props.isDetailFetching &&
                <Spinner />
              }
            </div> */}

            <RatingBar rating={props.detail.averageRating} maxRating={5} className='detail-rating-bar' />

            <div className="user-engagement-wrapper">
              {props.detail.comments.map((comment, index) => (
                <Comment
                  key={index}
                  username={comment.user.username}
                  userratio={comment.user.ratio}
                  comment={comment.content}
                />
              ))}
            </div>

            <TextField
              placeholder='Type something and press enter'
              value=''
              onChange={() => { }}
            />
            <Stars
              max={5}
              size='large'
              onSelectRating={(rating) => console.log(rating)}
            />
          </>
        }
      </div>
    </section>
  )
};
