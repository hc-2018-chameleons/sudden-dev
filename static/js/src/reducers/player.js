import * as actions from "../actions/player";


export default function playerReducer(state = [], action) {
  console.log(action.type);
  switch (action.type) {
    case actions.PLAYER_ADD:
      return [...state, { player: action.player }];

    case actions.PLAYER_REMOVE:
      return [...state, { player: action.player }];

    default:
      return state;
  }
}
