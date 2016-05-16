/*es-lint-disable no-unused-vars*/
let socket;
export default store => next => action => {
	if(action.meta) {
		if(action.type === "SET_SOCKET") {
			// set the socket for future use
			socket = action.socket;
		} else {
			socket.emit('action', action);
		}
	}

	next(action);
};