import { get } from '../utils/api';

export function setChat(chatState) {
	return { type: "SET_STATE", chatState };
}

export function setSocket(socket, userName) {
	// only for the purpose of the socketmiddleware
	return { type: "SET_SOCKET", socket, userName };
}

export function sendMessage(message, userName) {
	return { type: "SEND_MESSAGE", meta: { remote: true }, message, userName };
}

// used only on the server to add new users
// to the server side state. This is then emited
// to all connected clients
export function addUser(username, socketId) {
	return { type: "ADD_USER", username, socketId };
}

export function removeUser(socketId) {
	return { type: "REMOVE_USER", socketId };
}

export function getConnectedUsers() {
	return dispatch => {
		get(dispatch, "GET_CONNECTED_USERS");
	}
}

export function findMatch() {
	return dispatch => {
		return dispatch({
				type: "FIND_MATCH",
				payload: get(url)
			}).then(() => {
				// callback(); // on error?
			});
	};
}