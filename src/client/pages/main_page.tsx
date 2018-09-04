import * as React from 'react';
import { TextField } from '../components/textfield';
import { Button } from '../components/button';

interface Props {
  fetchPosts: () => void;
}

export class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className='main-page-wrapper'>
        main page :D
      </div>
    );
  }
}
