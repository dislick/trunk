import * as React from 'react';

import './sidebar.scss';

interface Props {

}

export const Sidebar = (props: Props) => (
  <section className='sidebar'>
    <div className="sidebar-inner">
      <img src={require('../assets/trunk_logo.svg')} className='logo' />
    </div>
  </section>
);
