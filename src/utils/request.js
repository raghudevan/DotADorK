/*eslint-disable import/default*/
import { configUtils } from '../store/configureStore';

// Default options used for every request
let headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"  
};

/**
* Make a post request
* @param {string} urlpath: url to be resolved
* @param {object} body:An object with body options
* @return {promise} Promise Object that is resolved with the given value
*/
export function post(urlpath, body) {
  // console.log('get', getst);
  // headers['Authorization'] = "Bearer " + configUtils.getState().appReducer.jwt;
  let options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body) 
  };
  return request(urlpath, options);
}

/**
* Make a get request
* @param {string} urlpath: url to be resolved
* @return {promise} Promise Object that is resolved with the given value
*/
export function get(urlpath) {
  // headers['Authorization'] = "Bearer " + configUtils.getState().appReducer.jwt;
  let options = {
    method: 'GET',
    headers: headers
  };
  return request(urlpath, options);
}

 /**
 * Promise.resolve(value) method returns a Promise object that is resolved with the given value. 
  If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable
 * @param {string} url: url to be resolved
 * @param {object} options:An object with header and body options
 * @return {promise} Promise Object that is resolved with the given value
 */
function request(url, options) {
  return Promise.resolve(fetch(url, options)
    .then(response => {
      // let jwt = response.headers.get('Authorization');
      return response.json().then((json) => {
        return { /*jwt, */...json };
      });
    })
  );
}