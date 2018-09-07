import * as React from 'react';
import { TorrentDetail } from '../components/torrent_detail';
import { SidebarConnected } from '../connected/sidebar_connected';

import './main_page_layout.scss';
import { TorrentListConnected } from '../connected/torrent_list_connected';

interface Props {
  onFetchPosts: () => void;
  onLogout: () => void;
}

export class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.onFetchPosts();
  }

  render() {
    return (
      <div className='main-page-wrapper'>
        <SidebarConnected />
        <TorrentListConnected />
        <TorrentDetail />
      </div>
    );
  }
}
