/*es-lint-disable no-unused-vars*/
let socket;
export default store => next => action => {
	if(action.meta) {
		socket.emit('action', action);
	} else {
		// set the socket for future use
		socket = action.socket;
		next(action);
	}
};