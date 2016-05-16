import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function makeStoreForServer() {
	const store = createStore(rootReducer);
	return store;
}