import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import App from './App';
import configureStore from './redux/store';
import history from './utils/history';
import theme from './styles/theme';

const store = configureStore();

const Main = () => (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseLine />
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <App />
          </SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
