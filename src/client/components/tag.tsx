import * as React from 'react';

import './tag.scss';

interface Props {
  children: React.ReactNode;
}

export const Tag = (props: Props) => (
  <div className="tag">
    <p>{props.children}</p>
  </div>
);
