import * as React from 'react';
import { TorrentListEntry } from './torrent_list_entry';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentUploadAreaConnected } from '../../connected/torrent_upload_area_connected';
import * as InfiniteScroll from 'react-infinite-scroller';

import './torrent_list.scss';
import { Spinner } from '../spinner';

interface Props {
  posts: TorrentResponseDTO[];
  selectedPost: string;
  reachedEndOfPosts: boolean;
  onSelectPost: (hash: string) => void;
  onRequestMorePosts: () => void;
}

export const TorrentList = (props: Props) => {
  if (!props.posts || props.posts.length <= 0) {
    return (
      <section className='torrent-list'>
        Nothing found
      </section>
    );
  }

  return (
    <section className='torrent-list'>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => props.onRequestMorePosts()}
        hasMore={!props.reachedEndOfPosts}
        loader={<Spinner key={0} />}
        useWindow={false}
      >
        <TorrentUploadAreaConnected />

        {props.posts.map((post) => (
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
      </InfiniteScroll>
    </section>
  );
}
