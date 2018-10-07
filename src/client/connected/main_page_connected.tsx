import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { authActions } from '../features/auth';
import { postsActions } from '../features/posts';
import { MainPage } from '../pages/main_page';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({

});

export const MainPageConnected = withRouter(connect(mapStateToProps, {
  onFetchPosts: postsActions.fetchPosts,
  onFetchPersonalInfo: authActions.fetchPersonalInfo,
  onExecuteSearch: postsActions.executeSearch,
  onSetSearchQuery: postsActions.setSearchQuery,
})(MainPage));
