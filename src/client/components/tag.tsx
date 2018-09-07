import * as React from 'react';
import * as classnames from 'classnames';

import './tag.scss';

interface Props {
  children: React.ReactNode;
  systemTag?: boolean;
}

export const Tag = (props: Props) => (
  <div className={classnames('tag', {
    'system-tag': props.systemTag,
  })}>
    <p>{props.children}</p>
  </div>
);
