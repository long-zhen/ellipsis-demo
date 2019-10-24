import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { LoadingContainer } from 'components/common';
import Header from 'containers/layout/Header';
import Notifier from 'containers/layout/Notifier';
import firebase from 'services/firebase';
import AppActions, { AppSelectors } from 'redux/AppRedux';

import Login from 'pages/login';
import Signup from 'pages/signup';
import Home from 'pages/home';
import Logs from 'pages/logs';

class App extends Component {
  componentDidMount() {
    this.unsubcsribe = firebase
      .auth()
      .onAuthStateChanged(this.handleAuthChange);
  }

  componentWillUnmount() {
    this.unsubcsribe();
  }

  handleAuthChange = currentUser => {
    const { changeUser } = this.props;
    changeUser(currentUser);
  };

  renderAnonRoutes() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    );
  }

  renderUserRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/logs" component={Logs} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  renderContent() {
    const { currentUser } = this.props;

    if (currentUser) {
      return this.renderUserRoutes();
    }

    return this.renderAnonRoutes();
  }

  render() {
    const { loaded } = this.props;

    return (
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <LoadingContainer loading={!loaded}>
          {() => (
            <>
              <Header />
              {this.renderContent()}
            </>
          )}
        </LoadingContainer>
        <Notifier />
      </Box>
    );
  }
}

App.propTypes = {
  changeUser: PropTypes.func,
  loaded: PropTypes.bool,
  currentUser: PropTypes.object
};

const mapStatesToProps = state => ({
  loaded: AppSelectors.selectLoaded(state),
  currentUser: AppSelectors.selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  changeUser: user => dispatch(AppActions.changeUser(user))
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(App);
