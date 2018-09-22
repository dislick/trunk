import * as React from 'react';
import * as classnames from 'classnames';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { UploadInfo } from '../torrent_list/torrent_list_entry';
import { Tag } from '../tag';
import { TagList } from '../tag_list';
import * as bytes from 'bytes';
import { getBaseUrl } from '../../api';
import { CommentDTO, RatingDTO } from '../../../server/controllers/torrent_detail_controller';
import { RatingBar } from './rating_bar';
import { Comment } from './comment';
import { TextField } from '../textfield';
import { Stars } from './stars';
import { isNumber } from 'lodash';
import { Rating } from './rating';
import { PostDetailState } from '../../features/posts/reducer';

import './torrent_detail.scss';

interface Props {
  visible: boolean;
  post: TorrentResponseDTO;
  detail: PostDetailState;
  isDetailFetching: boolean;
  onSetComment: (comment: string) => void;
  onPostComment: () => void;
  onUpdateRating: (rating: number) => void;
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

            <RatingBar rating={props.detail.averageRating} maxRating={5} className='detail-rating-bar' />

            <div className="user-engagement-wrapper">
              {props.detail.interactions.map((interaction, index) => {
                if (isNumber((interaction as RatingDTO).rating)) {
                  let rating = interaction as RatingDTO;
                  return (
                    <Rating
                      key={index}
                      rating={rating.rating}
                      username={rating.user.username}
                      userratio={rating.user.ratio}
                    />
                  );
                } else {
                  let comment = interaction as CommentDTO;
                  return (
                    <Comment
                      key={index}
                      username={interaction.user.username}
                      userratio={interaction.user.ratio}
                      comment={comment.content}
                    />
                  );
                }
              })}
            </div>

            <TextField
              placeholder='Type something and press enter'
              value={props.detail.commentInput}
              onChange={(event) => props.onSetComment(event.target.value)}
              onEnter={props.onPostComment}
            />
            <Stars
              max={5}
              size='large'
              filled={props.detail.myRating}
              onSelectRating={props.onUpdateRating}
            />
          </>
        }
      </div>
    </section>
  )
};
