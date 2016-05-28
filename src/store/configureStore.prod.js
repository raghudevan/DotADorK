import { createStore } from 'redux';
import rootReducer from '../reducers';

let store;
export default function configureStore(initialState) {
  store = createStore(rootReducer, initialState);
  return store;
}

export function getState() {
	return store.getState();
}