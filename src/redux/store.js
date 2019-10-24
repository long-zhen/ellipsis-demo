import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const enableMiddleware = (...middlewares) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return compose(applyMiddleware(...middlewares));
};

let store;

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(
    rootReducer,
    initialState,
    enableMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
