let url = "http://localhost:3000/testGET?param=1";

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

function post(urlpath,body) {
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
