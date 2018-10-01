import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Sidebar } from '../components/sidebar';
import { authActions } from '../features/auth';
import { postsActions } from '../features/posts';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  aboutMe: state.authReducer.personalInfo,
  searchQuery: state.postsReducer.searchQuery,
});

export const SidebarConnected = withRouter(connect(mapStateToProps, {
  onLogout: authActions.logout,
  onSetSearchQuery: postsActions.setSearchQuery,
  onExecuteSearch: postsActions.executeSearch,
})(Sidebar));
