import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { postsActions } from '../features/posts';
import { Sidebar } from '../components/sidebar';

const mapStateToProps = (state: RootState) => ({

});

export const SidebarConnected = connect(mapStateToProps, {
  onLogout: postsActions.logout,
})(Sidebar);
