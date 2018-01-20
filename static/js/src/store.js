import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "./reducers";
import wsMiddleware from "./middleware/WebSockets";

const initial = {
    ws: {host: []},
    players: []
}

let store = createStore(
  reducers,
  initial,
  applyMiddleware(wsMiddleware)
);

export default store;
