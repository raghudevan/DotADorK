import Server from 'socket.io';
import configureStore from '../../src/store/makeStoreForServer'
import * as findMatchActions from '../../src/actions/findMatchActions';

let io;
let store = configureStore();

function startSocketServer(server, store) {
	io = new Server().attach(server);

	// this middleware is used whenever a new 
	// connection is made. Which is why we can use 
	// this to keep track of new users
	io.use(function(socket, next) {
		let handshake = socket.request;
		let userName = handshake._query.name;
		console.log("io middleware", handshake._query);
		// console.log('socket', socket);
		store.dispatch(findMatchActions.addUser(userName, socket.id));
		next();
	});

	store.subscribe(() => {
		console.log('subscribing to the store');
		// so that we may emit changes to all the clients
		io.emit('state', store.getState().chatState);
	});

	io.on('connection', (socket) => {
		console.log('getting connection');
		socket.on('disconnect', function() {
			// setting up what needs to happen
			// when the user disconnects
			// console.log('disconnecting', socket);
			store.dispatch(findMatchActions.removeUser(socket.id));
		});
		socket.emit('state', store.getState().chatState);
		socket.on('action', function(data) {
			// what to do when any action is emitted
			// on the socket. 
			console.log('on action', data);
			store.dispatch(data);
		}.bind(store));
	});
}

export default function initSocketServer(server) {
	startSocketServer(server, store);
}