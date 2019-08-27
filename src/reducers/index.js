import { combineReducers } from "redux";
import counter from "./counter";
import read from './read'

const rootReducer = combineReducers({
  counter,
  read
});

export default rootReducer;
