import * as client_actions from "./../actions/WSClientActions";
import * as server_actions from "./../actions/WSServerActions";

import {PLAYER_UPDATE, PLAYER_YOU, playerUpdate, playerYou} from "./../actions/player.js"
import {START_ROUND, startRound, timeTick} from "./../actions/round.js"

const socketMiddleware = (function () {
  let socket = null;

  /**
   * Handler for when the WebSocket opens
   */
  function onOpen(ws, store, host) {
    // Authenticate with Backend... somehow...
    store.dispatch(client_actions.wsConnected(host));
    setTimeout(sendName,1000);
  };

  function sendName() {
      var message = {
	player_name : prompt("Enter your display name:", "anon")
      }
      socket.send(JSON.stringify(message));
  };

  /**
   * Handler for when the WebSocket closes
   */
  const onClose = (ws, store) => event => {
    store.dispatch(client_actions.wsDisconnected(event.host))
  };

  /**
   * Handler for when a message has been received from the server.
   */
  const onMessage = (ws, store) => event => {
    const payload = JSON.parse(event.data);

    console.log(payload);

    switch (payload.type) {
      case server_actions.WS_HEALTH:
        store.dispatch(server_actions.wsHealth(status));
        break;

      case PLAYER_UPDATE:
        store.dispatch(playerUpdate(payload));
        break;

      case PLAYER_YOU:
        store.dispatch(playerYou(payload));
        break;

      case START_ROUND:
        store.dispatch(startRound(payload));
        setInterval(() => store.dispatch(timeTick()), 1000);
        break;

      default:
        console.log("Received unknown server payload", payload);
        break;
    }
  };

  /**
   * Middleware
   */
  return store => next => action => {
    switch (action.type) {

      case client_actions.WS_CONNECT:
        if (socket !== null) {
          socket.close()
        }

        // Pass action along
        next(action);

        // Tell the store that we're busy connecting...
        store.dispatch(client_actions.wsConnecting(action.host));

        // Attempt to connect to the remote host...
        socket = new WebSocket(action.host);

        // Set up WebSocket handlers
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(socket, store);
        socket.onopen = onOpen(socket, store, action.host);


        break;

      case client_actions.WS_DISCONNECT:
        if (socket !== null) {
          socket.close()
        }
        socket = null;

        // Tell the store that we've been disconnected...
        store.dispatch(client_actions.wsDisconnected(action.host));

        break;

      default:
        return next(action);
    }
  };
})();

export default socketMiddleware;
