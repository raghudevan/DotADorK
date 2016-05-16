let url = "http://107.170.0.74:3000/testGET?param=1";

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

function post(urlpath, body) {
  	return request(
  		urlpath,
  		Object.assign({}, defaultOptions, { method: 'POST', body: JSON.stringify(body) })
	);
}	

function get(urlpath) {
	return request(
		urlpath,
	 	{ method: 'GET' }
 	);
}	

function request(url, options) {
	return Promise.resolve(fetch(url,options).then(response => {
		return response.json();
	}));
}
