import * as React from 'react';
import { Tag } from './tag';

interface Props {
  list: string;
}

export const TagList = (props: Props) => (
  <>
    {props.list && props.list.split(',').map((tag, index) => (
      <Tag key={index}>{tag}</Tag>
    ))}
  </>
);
