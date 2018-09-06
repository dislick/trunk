import * as React from 'react';
import { Button } from './button';

import './sidebar.scss';

interface Props {
  onLogout: () => void;
}

export const Sidebar = (props: Props) => (
  <section className='sidebar'>
    <div className="sidebar-inner">
      <img src={require('../assets/trunk_logo.svg')} className='logo' />
      <Button onClick={props.onLogout} className='logout'>Logout</Button>
    </div>
  </section>
);
