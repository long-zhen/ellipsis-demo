import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppActions, { AppSelectors } from 'redux/AppRedux';

function Header({ currentUser, logout, history }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box flex={1}>
          <Typography variant="h6">Ellipsis Demo</Typography>
        </Box>
        {currentUser ? (
          <Box>
            <Button color="inherit" onClick={() => history.push('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => history.push('/logs')}>
              Logs
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => history.push('/login')}>
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
  logout: PropTypes.func
};

const mapStatesToProps = state => ({
  currentUser: AppSelectors.selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AppActions.logout())
});

export default withRouter(
  connect(
    mapStatesToProps,
    mapDispatchToProps
  )(Header)
);
