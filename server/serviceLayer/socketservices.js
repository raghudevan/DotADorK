import Server from 'socket.io';
import configureStore from '../../src/store/makeStoreForServer'

let io;
let store = configureStore();

function startSocketServer(server, store) {
	io = new Server().attach(server);

	io.use(function(socket, next) {
		let handshake = socket.request;
		let userName = handshake._query.name;
		console.log("middleware", handshake._query);
		store.dispatch({ type: "UPDATE_USERS", userName });
		next();
	});

	store.subscribe(() => {
		console.log('post subscribing');
		// publish to everyone when some change happens
		io.emit('state', store.getState().chatState);
	});

	io.on('connection', (socket) => {
		console.log('getting connection');
		socket.emit('state', store.getState().chatState);
		socket.on('action', function(data) {
			console.log('on action', data);
			store.dispatch(data);
		}.bind(store));
	});
}

export default function initSocketServer(server) {
	startSocketServer(server, store);
}