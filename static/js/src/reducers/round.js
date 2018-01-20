import * as actions from "../actions/round";

export default function roundReducer(state = [], action) {
  switch (action.type) {
    case actions.START_ROUND:
      return Object.assign({}, state, {
          starttime_utc : action.round.starttime_utc,
          switch_time : action.round.switch_time,
          dead_time : action.round.dead_time,
          player_ordering : action.round.player_ordering,
          problem : action.round.problem,
          test_cases : action.round.test_cases,
      })

    default:
      return state;
  }
}
