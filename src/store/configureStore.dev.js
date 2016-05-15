// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
// import socketMiddleware from '../middleware/socketmiddleware';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    // Add other middleware on this line...
    applyMiddleware(thunkMiddleware, promiseMiddleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
