import * as React from 'react';
import { SidebarConnected } from '../connected/sidebar_connected';
import { TorrentListConnected } from '../connected/torrent_list_connected';
import { TorrentDetailConnected } from '../connected/torrent_detail_connected';

import './main_page_layout.scss';

interface Props {
  onFetchPosts: () => void;
  onLogout: () => void;
  onFetchPersonalInfo: () => void;
}

export class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.onFetchPosts();
    this.props.onFetchPersonalInfo();
  }

  render() {
    return (
      <div className='main-page-wrapper'>
        <SidebarConnected />
        <TorrentListConnected />
        <TorrentDetailConnected />
      </div>
    );
  }
}
