import * as React from 'react';

import './username.scss';

interface Props {
  ratio: string;
  children: React.ReactNode;
}

export const Username = (props: Props) => (
  <span className="username">
    {props.children}<span>{props.ratio}</span>
  </span>
);
