let initialState = {
	roomId: "",
	roomUsers: [],
	roomChat: [],
	socketNameMap: {}, // { socket:userName }
	connectedUsers: [], // {username, socketid}
	rooms: {}, // { roomId: {users: [], chat: []} }
	chat: [] // [{ userName, message }]
}

export default function chatState(state = initialState, action) {
	switch(action.type) {
		case "SET_STATE":
		{
			return Object.assign({}, state, action.chatState);
		}
		case "SET_ROOM":
		{
			return Object.assign({}, state, { roomId: action.roomId, roomUsers: action.roomUsers, roomChat: action.roomChat });
		}
		case "SEND_MESSAGE":
		{
			// used on the client
			let newMessage = { 
				userName: action.userName, 
				message: action.message
			};
			return Object.assign({}, state, { chat: state.chat.concat([newMessage]) })
		}
		case "ADD_USER":
		{
			// this is used only on the server
			let newUser = {};
			newUser[action.socket.id] = action.username;

			// the socketNameMap will be sent to every client. 
			// Should prolly keep it on the server side only
			return Object.assign({}, state, { 
				socketNameMap: Object.assign({}, state.socketNameMap, newUser),
				connectedUsers: state.connectedUsers.concat([action.username])
			});
		}
		case "REMOVE_USER":
		{
			console.log('removing a user');
			let newSocketNameMap = Object.assign({}, state.socketNameMap);
			console.log("number of users", Object.keys(newSocketNameMap).length);
			let newConnectedUsers = state.connectedUsers.concat([]);
			let userName = newSocketNameMap[action.socketId];
			delete newSocketNameMap[action.socketId];
			console.log("number of users post removal", Object.keys(newSocketNameMap).length);
			let unameIndex = newConnectedUsers.indexOf(userName);
			console.log("index of", userName, "is", unameIndex);
			if(unameIndex != -1) {
				newConnectedUsers.splice(unameIndex, 1);
			}

			return Object.assign({}, state, { socketNameMap: newSocketNameMap, connectedUsers: newConnectedUsers });
		}
		case "GET_CONNECTED_USERS_PENDING": 
		{
			// good place to set some loading flag
			return state;
		}
		case "GET_CONNECTED_USERS_FULFILLED": 
		{
			console.log("action.payload.connectedUsers : "+action.payload.connectedUsers);
			return Object.assign({}, state, { connectedUsers: action.payload.connectedUsers });
		}
		case "GET_CONNECTED_USERS_REJECTED": 
		{	
			// good place to set some err flag or w/e
			return state;
		}
		case "MAKE_NEW_ROOM":
		{
			console.log("MAKING NEW ROOM");
			let newRoom = {};
			newRoom[action.matchId] = { users: [state.socketNameMap[action.socketId]], chat: [] };
			console.log('newRoom', newRoom, state.socketNameMap);
			return Object.assign({}, state, { rooms: Object.assign({}, state.rooms, newRoom) });
		}
		case "ADD_USER_TO_ROOM":
		{
			let newUsers = state.rooms[action.matchId].users.concat([state.socketNameMap[action.socketId]]);
			let chat = state.rooms[action.matchId].chat.concat([]);
			
			let newRoom = {};
			newRoom[action.matchId] = { users: newUsers, chat: chat };
			return Object.assign({}, state, { rooms: Object.assign({}, state.rooms, newRoom) });
		}
		default:
		{
			return state;
		}
	}
}