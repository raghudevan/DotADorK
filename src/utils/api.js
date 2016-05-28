import * as request from './request';

// can't find any other way i can put window.location here
let promiseOfUrl = new Promise((res, rej) => {
	res(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port);
});
const apiEndPoints = {
	"GET_CONNECTED_USERS": "/getConnectedUsers"
}

// REST
function makeAPICall(dispatch, type, req, options) {
	let f = req === "get" ? request.get : request.post;
	promiseOfUrl.then(url => {
		let uri = url + apiEndPoints[type];
		return dispatch({
			type: type,
			payload: options ? f(uri, options) : f(uri)
		});
	});
}

export function get(dispatch, type) {
	makeAPICall(dispatch, type, "get");
}

export function post(dispatch, type, options) {
	makeAPICall(dispatch, type, "post", options);
}

export const baseURL = promiseOfUrl;