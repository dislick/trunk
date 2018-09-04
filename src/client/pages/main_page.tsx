import * as React from 'react';
import { TextField } from '../components/textfield';
import { Button } from '../components/button';

interface Props {
  onFetchPosts: () => void;
  onLogout: () => void;
}

export class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.onFetchPosts();
  }

  render() {
    return (
      <div className='main-page-wrapper'>
        <p>main page :D</p>
        <Button onClick={this.props.onLogout}>Logout</Button>
      </div>
    );
  }
}
