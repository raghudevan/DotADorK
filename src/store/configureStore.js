/* eslint-disable global-require */
let configureStore;
if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.prod');
} else {
  configureStore = require('./configureStore.dev');
}

export default configureStore.default;
export const configUtils = {
	getState: configureStore.getState
}