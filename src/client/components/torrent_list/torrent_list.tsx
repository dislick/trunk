import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import { TorrentUploadAreaConnected } from '../../connected/torrent_upload_area_connected';
import { TorrentListEntry } from './torrent_list_entry';

import { Spinner } from '../spinner';
import './torrent_list.scss';

interface Props {
  posts: TorrentResponseDTO[];
  selectedPost: string;
  reachedEndOfPosts: boolean;
  onSelectPost: (hash: string) => void;
  onRequestMorePosts: () => void;
}

export const TorrentList = (props: Props) => {
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

        {!props.posts || props.posts.length <= 0 &&
          <p className='empty'>There doesn't seem to be anything here</p>
        }

        {props.posts && props.posts.map((post) => (
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
};
