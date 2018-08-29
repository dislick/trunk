import * as React from 'react';

import './textfield.scss';

export interface TextFieldProps {
  value: string;
  placeholder?: string;
  onChange: (event) => void;
}

export const TextField = (props: TextFieldProps) => {
  return (
    <input
      type='text'
      className='trunk-textfield'
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      autoCorrect='off'
    />
  )
};
