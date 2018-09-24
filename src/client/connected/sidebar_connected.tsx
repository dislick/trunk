import { connect } from 'react-redux';
import { Sidebar } from '../components/sidebar';
import { authActions } from '../features/auth';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  aboutMe: state.authReducer.personalInfo,
});

export const SidebarConnected = connect(mapStateToProps, {
  onLogout: authActions.logout,
})(Sidebar);
