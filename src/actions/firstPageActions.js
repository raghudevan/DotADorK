import * as actionTypes from '../constants/actionTypes';

export function setText(text) {
	return { type: actionTypes.SET_TEXT, text };
}