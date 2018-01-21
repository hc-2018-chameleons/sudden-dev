import * as actions from "../actions/player";

export default function playerReducer(state = [], action) {
  console.log(action.type);
  switch (action.type) {
    case actions.PLAYER_UPDATE:
      return Object.assign({}, state, {
          players: action.players,
          you: state.you
      })

    case actions.PLAYER_YOU:
      return Object.assign({}, state, {
          players: state.players,
          you: action.you
      })

    default:
      return state;
  }
}
