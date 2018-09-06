import * as React from 'react';
import { TextField } from '../components/textfield';
import { Button } from '../components/button';
import { Sidebar } from '../components/sidebar';
import { TorrentList } from '../components/torrent_list';
import { TorrentDetail } from '../components/torrent_detail';

import './main_page_layout.scss';

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
        <Sidebar />
        <TorrentList />
        <TorrentDetail />
      </div>
    );
  }
}
