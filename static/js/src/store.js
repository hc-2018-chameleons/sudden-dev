import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "./reducers";
import wsMiddleware from "./middleware/WebSockets";

const initial = {
    ws: {host: []},
    players: []
}

let store = createStore(
  reducers,
  initial
);

  //compose(applyMiddleware(wsMiddleware),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //)
export default store;
