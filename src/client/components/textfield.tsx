import * as React from 'react';
import * as classnames from 'classnames';

import './textfield.scss';

export interface TextFieldProps {
  value: string;
  placeholder?: string;
  name?: string;
  type?: string;
  className?: string;
  onChange: (event) => void;
  onEnter?: () => void;
}

export const TextField = (props: TextFieldProps) => {
  return (
    <input
      type={props.type || 'text'}
      className={classnames('trunk-textfield', props.className)}
      value={props.value}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          props.onEnter();
        }
      }}
      autoCorrect='off'
      autoCapitalize='off'
      spellCheck={false}
    />
  )
};
