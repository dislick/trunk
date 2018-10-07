import * as bytes from 'bytes';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PersonalInfoDTO } from '../../server/controllers/login_controller';
import { getFormattedRatio } from '../../server/utils/ratio_calculator';
import { Button } from './button';
import { TextField } from './textfield';

import './sidebar.scss';

interface Props {
  aboutMe: PersonalInfoDTO;
  searchQuery: string;
  onLogout: () => void;
  onSetSearchQuery: (query: string) => void;
  onExecuteSearch: () => void;
}

interface State {
  urlHasBeenCopied: boolean;
}

/**
 * Copies a string to clipboard using the navigator.clipboard API.
 * @param content
 */
const copyToClipboard = (content: string) => {
  (navigator as any).clipboard.writeText(content);
};

export class Sidebar extends React.Component<Props & RouteComponentProps, State> {
  private timeout;

  public state: State = {
    urlHasBeenCopied: false,
  };

  public formatBytes = (amount) => {
    return bytes(amount, { unitSeparator: ' ' });
  }

  public handleCopyClick = async () => {
    copyToClipboard(this.props.aboutMe.announceUrl);
    this.setState({ urlHasBeenCopied: true });

    this.timeout = setTimeout(() => {
      this.setState({ urlHasBeenCopied: false });
    }, 5000);
  }

  public componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  public startSearch = () => {
    if (this.props.searchQuery.length > 0) {
      this.props.history.push('/search/' + this.props.searchQuery);
    } else {
      this.props.history.push('/');
    }
  }

  public handleLogoClick = () => {
    this.props.history.push('/');
  }

  public render() {
    return (
      <section className='sidebar'>
        <div className='sidebar-inner'>
          <img
            src={require('../assets/trunk_logo.svg')}
            className='logo'
            onClick={this.handleLogoClick}
          />

          <div className='search-area'>
            <TextField
              value={this.props.searchQuery}
              placeholder='Search torrents...'
              onChange={(event) => this.props.onSetSearchQuery(event.target.value)}
              onEnter={this.startSearch}
            />
            <p className='pro-tip'>
              {/* tslint:disable-next-line:max-line-length */}
              <span className='bold'>ProTip</span>: You can use expressions like <span className='query'>tag:movie</span> and <span className='query'>user:john</span> to search more specifically.
            </p>
          </div>

          <div className='personal-area'>
            {this.props.aboutMe &&
              <div className='about-me'>
                <p className='user'>{this.props.aboutMe.username}</p>

                <table className='stats'>
                  <tbody>
                    <tr>
                      <td><p>up</p></td>
                      <td><p>{this.formatBytes(this.props.aboutMe.total_uploaded)}</p></td>
                    </tr>
                    <tr>
                      <td><p>down</p></td>
                      <td><p>{this.formatBytes(this.props.aboutMe.total_downloaded)}</p></td>
                    </tr>
                    <tr>
                      <td><p>ratio</p></td>
                      <td><p>{getFormattedRatio(
                        this.props.aboutMe.total_uploaded,
                        this.props.aboutMe.total_downloaded,
                      )}</p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
            <Button
              onClick={this.handleCopyClick}
              className='copy-announce-url'
            >
              {!this.state.urlHasBeenCopied
                ?
                'Copy Announce URL'
                :
                'Copied!'
              }
            </Button>
            <Button onClick={this.props.onLogout} className='logout'>Logout</Button>
          </div>
        </div>
      </section>
    );
  }
}
