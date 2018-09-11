import * as React from 'react';
import * as classnames from 'classnames';

import './stars.scss';

interface Props {
  max: number;
  filled?: number;
  onSelectRating?: (rating: number) => void;
  size: 'small' | 'large';
}


/**
 * Please note that these stars get display in reverse order so that we can use
 * the CSS operator ~ to handle the hover effect. That's why onSelectRating
 * needs to subtract the index from max.
 */
export const Stars = (props: Props) => {
  const filled = props.filled || 0;

  return (
    <div className={classnames('stars', props.size)}>
      <div className="inner">
        {Array(props.max).fill(0).map((n, index) => (
          <div
            key={index}
            className={classnames('star', {
              'filled': (props.max - index - 1) < filled,
              'outlined': (props.max - index - 1) >= filled,
              'selectable': props.onSelectRating !== void 0,
            })}
            onClick={() => props.onSelectRating && props.onSelectRating(props.max - index)}
          />
        ))}
      </div>
    </div>
  );
};
