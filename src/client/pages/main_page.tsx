import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SidebarConnected } from '../connected/sidebar_connected';
import { TorrentDetailConnected } from '../connected/torrent_detail_connected';
import { TorrentListConnected } from '../connected/torrent_list_connected';

import './main_page_layout.scss';

interface Props {
  onFetchPosts: () => void;
  onLogout: () => void;
  onFetchPersonalInfo: () => void;
  onExecuteSearch: () => void;
  onSetSearchQuery: (query: string) => void;
}

type MainPageProps = Props & RouteComponentProps;

export class MainPage extends React.Component<MainPageProps> {
  public componentWillMount() {
    this.props.onFetchPersonalInfo();

    this.handleSearch(this.props.match.params['query']);
  }

  public componentWillReceiveProps(nextProps: MainPageProps) {
    this.handleSearch(nextProps.match.params['query']);
  }

  public handleSearch = (query: string) => {
    this.props.onSetSearchQuery(query);
    this.props.onExecuteSearch();
  }

  public render() {
    return (
      <div className='main-page-wrapper'>
        <SidebarConnected />
        <TorrentListConnected />
        <TorrentDetailConnected />
      </div>
    );
  }
}
