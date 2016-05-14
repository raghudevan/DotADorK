import * as actionTypes from '../constants/actionTypes';

let initialState = {
  text: "hello world"
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function firstPageState(state = initialState, action) {

  switch (action.type) {

    case actionTypes.SET_TEXT:
    {
      return Object.assign({}, state, { text: action.text });
    }
    default:
    {
      return state;
    }
  }
}
