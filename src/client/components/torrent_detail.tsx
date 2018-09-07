import * as React from 'react';
import * as classnames from 'classnames';

import './torrent_detail.scss';

interface Props {
  visible: boolean;
}

export const TorrentDetail = (props: Props) => (
  <section className={classnames('torrent-detail', {
    'hide-detail': !props.visible
  })}>
    
  </section>
);
