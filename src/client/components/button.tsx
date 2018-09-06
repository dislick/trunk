import * as React from 'react';
import * as classnames from 'classnames';

import './button.scss';

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={classnames('trunk-button', props.className, {
        'full-width': props.fullWidth,
      })}
      onClick={props.onClick}
    >
      <p>{props.children}</p>
    </button>
  )
};
