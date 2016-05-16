import { combineReducers } from 'redux';
import firstPageState from './firstPageReducer';
import findMatchState from './findMatchReducer';
import chatState from './chatReducer';

const rootReducer = combineReducers({
  firstPageState,
  findMatchState,
  chatState
});

export default rootReducer;
