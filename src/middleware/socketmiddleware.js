/*es-lint-disable no-unused-vars*/
let socket;
export default store => next => action => {
	if(action.meta) {
		// if the action contains the meta attribute
		// we emit the action on the socket
		socket.emit('action', action);
	} else {
		// set the socket for future use
		if(action.type === "SET_SOCKET") {
			socket = action.socket;
		}
		next(action);
	}
};