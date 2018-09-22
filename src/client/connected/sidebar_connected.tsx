import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { authActions } from '../features/auth';
import { Sidebar } from '../components/sidebar';

const mapStateToProps = (state: RootState) => ({

});

export const SidebarConnected = connect(mapStateToProps, {
  onLogout: authActions.logout,
})(Sidebar);
