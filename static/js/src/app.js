import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ActivePlayerList from "./components/playerlist"
import ActiveProblemBar from "./components/problembar"
import ActiveSidebar from "./components/sidebar"
import Editor from "./components/editor"
import WebSocketContainer from "./components/containers/WebSocketConnection";
import {playerAdd} from './actions/player.js'
import {startRound, nextPlayer} from './actions/round.js'

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

store.dispatch(playerAdd('Thi'));
store.dispatch(playerAdd('Nik'));
store.dispatch(playerAdd('FistOfHit'));
store.dispatch(playerAdd('wakeuprj'));

let round = {
    starttime_utc : '10:00',
    switch_time : '2',
    dead_time : '5',
    player_ordering : ['Thi', 'Nik', 'FistOfHit', 'wakeuprj'],
    problem : 'Sort a list!',
    test_cases : ['[1,2,3,4]', '[4,3,2,1]', '[4564,2,a,hello]']
}

store.dispatch(startRound(round));

setInterval(() => store.dispatch(nextPlayer()), 1000);

class App extends Component {
  render() {
    return (
        <div id="main">
            <ActiveProblemBar />
            <div id="players-sidebar">
                <ActivePlayerList />
            </div>
            <Editor />
            <div id="others-sidebar">
                <ActiveSidebar />
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
