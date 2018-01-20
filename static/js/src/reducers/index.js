import { combineReducers } from "redux";
import wsReducer from "./WebSockets";
import players from "./player";
import round from "./round";

export const reducers = combineReducers({
  ws: wsReducer,
  players: players,
  round: round
});
