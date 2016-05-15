let initialState = {
	response: "no reponse yet..."
}

export default function findMatchState(state = initialState, action) {
	switch(action.type) {
		case "FIND_MATCH_FULFILLED":
		{
			return Object.assign({}, state, { response: action.payload.response });
		}
		default:
		{
			return state;
		}
	}
}