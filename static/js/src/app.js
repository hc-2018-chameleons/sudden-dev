import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ActivePlayerList from "./components/playerlist"
import ActiveProblemBar from "./components/problembar"
import ActiveSidebar from "./components/sidebar"
import Editor from "./components/editor"
import WebSocketContainer from "./components/containers/WebSocketConnection";
import {playerUpdate, playerYou} from './actions/player.js'
import {startRound, timeTick} from './actions/round.js'

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

//store.dispatch(playerYou(0));
//store.dispatch(playerUpdate({
    //0: 'Thi',
    //1: 'Nik',
    //2: 'Hit',
    //3: 'Rish'
//}));

//let round = {
    //starttime_utc : new Date().getTime(),
    //time_limit : 100,
    //player_ordering : [0, 1, 3, 2],
    //problem : 'Sort a list!',
    //test_case_inputs : ['[1,2,3,4]', '[4,3,2,1]', '[4564,2,a,hello]'],
    //test_case_outputs : ['[1,2,3,4]', '[4,3,2,1]', '[4564,2,a,hello]']
//}

//store.dispatch(startRound(round));

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
