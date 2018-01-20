import { combineReducers } from "redux";
import wsReducer from "./WebSockets";
import players from "./player";

export const reducers = combineReducers({
  ws: wsReducer,
  players: players
});
