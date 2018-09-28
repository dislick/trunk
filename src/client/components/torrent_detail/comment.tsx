import * as React from 'react';
import { Username } from '../username';

import './comment.scss';

interface Props {
  username: string;
  userratio: string;
  content: string;
}

export const Comment = (props: Props) => (
  <div className='comment'>
    <p>
      <Username ratio={props.userratio}>{props.username}</Username>
      <span className='content'>{props.content}</span>
    </p>
  </div>
);
