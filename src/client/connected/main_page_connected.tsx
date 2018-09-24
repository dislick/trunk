import { connect } from 'react-redux';
import { authActions } from '../features/auth';
import { postsActions } from '../features/posts';
import { MainPage } from '../pages/main_page';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({

});

export const MainPageConnected = connect(mapStateToProps, {
  onFetchPosts: postsActions.fetchPosts,
  onFetchPersonalInfo: authActions.fetchPersonalInfo,
})(MainPage);
