import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ActivePlayerList from "./components/playerlist"
import WebSocketContainer from "./components/containers/WebSocketConnection";
import {playerAdd} from './actions/player.js'

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

store.dispatch(playerAdd('asdfasdf'));

class App extends Component {
  render() {
    return (
        <ActivePlayerList />
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <WebSocketContainer host="ws://localhost:8000/tracking" autoconnect={true}>
      <App />
    </WebSocketContainer>
  </Provider>,
  rootElement
);

