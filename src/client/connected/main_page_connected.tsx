import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { MainPage } from '../pages/main_page';
import { postsActions } from '../features/posts';

const mapStateToProps = (state: RootState) => ({

});

export const MainPageConnected = connect(mapStateToProps, {
  fetchPosts: postsActions.fetchPosts,
})(MainPage);
