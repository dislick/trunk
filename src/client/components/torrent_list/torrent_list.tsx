import * as React from 'react';
import { TorrentListEntry } from './torrent_list_entry';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentUploadAreaConnected } from '../../connected/torrent_upload_area_connected';

import './torrent_list.scss';

interface Props {
  posts: TorrentResponseDTO[];
  selectedPost: string;
  onSelectPost: (hash: string) => void;
}

export const TorrentList = (props: Props) => {
  if (!props.posts || props.posts.length <= 0) {
    return (
      <section className='torrent-list'>
        nothing found
      </section>
    );
  }

  return (
    <section className='torrent-list'>
      <TorrentUploadAreaConnected />

      {props.posts.map((post, index) => (
        <TorrentListEntry
          key={post.hash}
          hash={post.hash}
          title={post.title}
          size={post.size}
          tags={post.tags}
          uploadedAt={post.uploaded_at}
          seeders={post.seeders}
          leechers={post.leechers}
          username={post.user.username}
          userratio={post.user.ratio}
          selected={post.hash === props.selectedPost}
          onClick={() => props.onSelectPost(post.hash)}
        />
      ))}
    </section>
  );
}
