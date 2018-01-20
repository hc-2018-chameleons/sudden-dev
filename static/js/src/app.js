import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ActivePlayerList from "./components/playerlist"
import Sidebar from "./components/sidebar"
import Editor from "./components/editor"
import WebSocketContainer from "./components/containers/WebSocketConnection";
import {playerAdd} from './actions/player.js'

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

store.dispatch(playerAdd('asdfasdf'));

class App extends Component {
  render() {
    return (
        <div id="main">
            <div id="players-sidebar">
                <ActivePlayerList />
            </div>
            <Editor />
            <div id="others-sidebar">
                <Sidebar />
            </div>
        </div>
    );
  }
}
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var chatsock = ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname;

ReactDOM.render(
  <Provider store={store}>
    <WebSocketContainer host={chatsock} autoconnect={true}>
      <App />
    </WebSocketContainer>
  </Provider>,
  rootElement
);
