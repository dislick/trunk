import * as React from 'react';

import './textfield.scss';

export interface TextFieldProps {
  value: string;
  placeholder?: string;
  name?: string;
  type?: string;
  onChange: (event) => void;
}

export const TextField = (props: TextFieldProps) => {
  return (
    <input
      type={props.type || 'text'}
      className='trunk-textfield'
      value={props.value}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
      autoCorrect='off'
      autoCapitalize='off'
      spellCheck={false}
    />
  )
};
