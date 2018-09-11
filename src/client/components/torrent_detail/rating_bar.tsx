import * as React from 'react';
import * as classnames from 'classnames';
import { isNull } from 'lodash';

import './rating_bar.scss';

interface Props {
  rating: number;
  maxRating: number;
  className?: string;
}

export const RatingBar = (props: Props) => (
  <div className={classnames("rating-bar-wrapper", props.className)}>
    <div className="rating-bar">
      <div className="progress" style={{
        width: (props.rating / props.maxRating * 100).toString() + '%'
      }}></div>
    </div>
    <p className='rating-text'>
      {
        isNull(props.rating) ? '-' : props.rating.toFixed(1)
      }
      <span>/{props.maxRating}</span>
    </p>
  </div>
);
