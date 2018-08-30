import * as React from 'react';

import './button.scss';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className='trunk-button' onClick={props.onClick}>
      <p>{props.children}</p>
    </button>
  )
};
