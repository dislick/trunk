import * as React from 'react';
import { Tag } from './tag';

interface Props {
  list: string;
  onClick?: (tagContent: string) => void;
}

export const TagList = (props: Props) => (
  <>
    {props.list && props.list.split(',').map((tag, index) => (
      <Tag key={index} onClick={props.onClick}>{tag}</Tag>
    ))}
  </>
);
