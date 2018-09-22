import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { MainPage } from '../pages/main_page';
import { postsActions } from '../features/posts';
import { authActions } from '../features/auth';

const mapStateToProps = (state: RootState) => ({

});

export const MainPageConnected = connect(mapStateToProps, {
  onFetchPosts: postsActions.fetchPosts,
  onFetchPersonalInfo: authActions.fetchPersonalInfo,
})(MainPage);
