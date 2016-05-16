let initialState = {
	usersConnected: [],
	chat: [] // [{userName, message}]
}

export default function chatState(state = initialState, action) {
	switch(action.type) {
		case "SET_STATE":
		{
			return Object.assign({}, state, action.chatState);
		}
		case "SEND_MESSAGE":
		{
			let newMessage = { 
				userName: action.userName, 
				message: action.message
			};
			return Object.assign({}, state, { chat: state.chat.concat([newMessage]) })
		}
		case "UPDATE_USERS":
		{
			return Object.assign({}, state, { usersConnected: state.usersConnected.concat([action.userName])});
		}
		default:
		{
			return state;
		}
	}
}