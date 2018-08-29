import * as React from 'react';

import './button.scss';

export interface ButtonProps {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className='trunk-button'>
      <p>{props.children}</p>
    </button>
  )
};
