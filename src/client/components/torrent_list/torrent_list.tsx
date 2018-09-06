import * as React from 'react';
import { TorrentListEntry } from './torrent_list_entry';

import './torrent_list.scss';

interface Props {

}

export const TorrentList = (props: Props) => (
  <section className='torrent-list'>
    <TorrentListEntry
      hash='abcdefgh'
      title='Ubuntu 18.04 Desktop'
      size={20789570}
      tags='linux,ubuntu'
      uploadedAt={new Date()}
      username='dislick'
      userratio='2.04'
    />

    <TorrentListEntry
      hash='abcdefghfda'
      title='Arch Linux 2018.09.01-x86_64'
      size={20789570}
      tags='linux,arch-linux'
      uploadedAt={new Date('2018-09-06T13:53:39.555Z')}
      username='dislick'
      userratio='2.04'
    />
  </section>
);
