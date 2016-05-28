import { applyMiddleware, createStore, compose } from 'redux';
import socketMiddleware from '../middleware/socketmiddleware';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

let store;
export default function configureStore(initialState) {
	store = createStore(rootReducer, initialState, compose(
		applyMiddleware(socketMiddleware, thunkMiddleware, promiseMiddleware())
	));
	return store;
}

export function getState() {
	return store.getState();
}