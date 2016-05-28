import Server from 'socket.io';
import configureStore from '../../src/store/makeStoreForServer'
import * as findMatchActions from '../../src/actions/findMatchActions';
import { createOrJoinMatch } from '../dataLayer/matchInventory';

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
		store.dispatch(findMatchActions.addUser(userName, socket));
		next();
	});

	store.subscribe(() => {
		console.log('subscribing to the store');
		// so that we may emit changes to all the clients
		io.emit('FULL', store.getState().chatState);
	});

	io.on('connection', (socket) => {
		console.log('getting connection');
		let socketId = socket.id;
		socket.on('disconnect', function() {
			// setting up what needs to happen
			// when the user disconnects
			// console.log('disconnecting', socket);
			store.dispatch(findMatchActions.removeUser(socketId));
		});

		/*socket.emit('state', store.getState().chatState);
		socket.on('action', function(data) {
			// what to do when any action is emitted
			// on the socket. 
			console.log('on action', data);
			store.dispatch(data);
		}.bind(store));*/
		
		// get room name
		createOrJoinMatch(socketId, (res) => {
			if(res.success) {
				let matchId = res.match.matchId;
				console.log(matchId);
				socket.join(matchId);
				
				if(!store.getState().chatState.rooms[matchId]) {
					// make a new slice in the state for this room
					console.log('making new room and adding user to it');
					store.dispatch({ type: "MAKE_NEW_ROOM", matchId, socketId });
				} else {
					console.log('adding user to existing room');
					store.dispatch({ type: "ADD_USER_TO_ROOM", matchId, socketId })
				}

				console.log(store.getState().chatState.rooms);
				var toEmit = { matchId, ...store.getState().chatState.rooms[matchId] };
				console.log('to emit to room', toEmit);
				io.to(matchId).emit('ROOM', toEmit);
				
				socket.on('action', function(data) {
					// what to do when any action is emitted
					// on the socket. 
					console.log('on action', data);
					store.dispatch(data);
				}.bind(store));
			}
		});
	});
}

export default function initSocketServer(server) {
	startSocketServer(server, store);
}