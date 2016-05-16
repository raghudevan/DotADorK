let initialState = {
	isConnected: false,
	userName: ""
}

export default function findMatchState(state = initialState, action) {
	switch(action.type) {
		case "SET_SOCKET": 
		{
			// if this is happening, that means user is connected
			// to the socket
			return Object.assign({}, state, { isConnected: true, userName: action.userName });
		}
		default:
		{
			return state;
		}
	}
}