import { createStore } from 'redux';
import rootReducer from '../reducers';

let store;
export default function makeStoreForServer() {
	store = createStore(rootReducer);
	return store;
}

export function getState() {
	return store.getState();
}