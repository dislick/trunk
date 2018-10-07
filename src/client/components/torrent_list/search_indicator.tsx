import * as React from 'react';

import './search_indicator.scss';

interface Props {
  query: string;
}

export const SearchIndicator = (props: Props) => (
  <div className='search-indicator'>
    <p>Displaying search results for:</p>
    <p className='query'>"{props.query}"</p>
  </div>
);
