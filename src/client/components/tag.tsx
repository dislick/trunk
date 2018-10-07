import * as classnames from 'classnames';
import { isFunction } from 'lodash';
import * as React from 'react';

import './tag.scss';

interface Props {
  children: React.ReactNode;
  systemTag?: boolean;
  onClick?: (tagContent: string) => void;
}

export const Tag = (props: Props) => (
  <div
    className={classnames('tag', {
      'system-tag': props.systemTag,
      'clickable': isFunction(props.onClick),
    })}
    onClick={() => isFunction(props.onClick) && props.onClick(props.children.toString())}
  >
    <p>{props.children}</p>
  </div>
);
