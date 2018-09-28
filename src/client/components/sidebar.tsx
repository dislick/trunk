import * as bytes from 'bytes';
import * as React from 'react';
import { PersonalInfoDTO } from '../../server/controllers/login_controller';
import { Button } from './button';

import { getFormattedRatio } from '../../server/utils/ratio_calculator';
import './sidebar.scss';

interface Props {
  aboutMe: PersonalInfoDTO;
  onLogout: () => void;
}

const copyToClipboard = async (content: string) => {
  return (navigator as any).clipboard.writeText(content);
};

export const Sidebar = (props: Props) => {
  const formatBytes = (amount) => bytes(amount, { unitSeparator: ' ' });

  return (
    <section className='sidebar'>
      <div className='sidebar-inner'>
        <img src={require('../assets/trunk_logo.svg')} className='logo' />

        <div className='personal-area'>

          {props.aboutMe &&
            <div className='about-me'>
              <p className='user'>{props.aboutMe.username}</p>

              <table className='stats'>
                <tbody>
                  <tr>
                    <td><p>up</p></td>
                    <td><p>{formatBytes(props.aboutMe.total_uploaded)}</p></td>
                  </tr>
                  <tr>
                    <td><p>down</p></td>
                    <td><p>{formatBytes(props.aboutMe.total_downloaded)}</p></td>
                  </tr>
                  <tr>
                    <td><p>ratio</p></td>
                    <td><p>{getFormattedRatio(props.aboutMe.total_uploaded, props.aboutMe.total_downloaded)}</p></td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          <Button
            onClick={() => copyToClipboard(props.aboutMe.announceUrl)}
            className='copy-announce-url'
          >
            Copy Announce URL
          </Button>
          <Button onClick={props.onLogout} className='logout'>Logout</Button>
        </div>
      </div>
    </section>
  );
};
