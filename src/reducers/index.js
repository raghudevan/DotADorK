import { combineReducers } from 'redux';
import firstPageState from './firstPageReducer';
import findMatchState from './findMatchReducer';

const rootReducer = combineReducers({
  firstPageState,
  findMatchState
});

export default rootReducer;
