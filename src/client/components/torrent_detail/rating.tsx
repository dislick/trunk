import * as React from 'react';
import { Username } from '../username';
import { Stars } from './stars';

import './rating.scss';

interface Props {
  username: string;
  userratio: string;
  rating: number;
}

export const Rating = (props: Props) => (
  <div className="rating">
    <p><Username ratio={props.userratio}>{props.username}</Username></p>
    <Stars filled={props.rating} max={5} size='small' />
  </div>
);
