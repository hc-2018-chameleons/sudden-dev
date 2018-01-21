import * as actions from "../actions/round";

export default function roundReducer(state = [], action) {
  switch (action.type) {
    case actions.START_ROUND:
      let utc = new Date().getTime();
      let current_time = Math.min(action.round.time_limit, utc + action.round.time_limit - action.round.starttime_utc);
      return Object.assign({}, state, {
          starttime_utc : action.round.starttime_utc,
          time_limit : action.round.time_limit,
          switch_time : action.round.switch_time,
          dead_time : action.round.dead_time,
          player_ordering : action.round.player_ordering,
          problem : action.round.problem,
          test_cases : action.round.test_cases,

          current_time : current_time,
          is_switch_time : false
      })

    case actions.TIME_TICK:
      //quick dirty hack nobody needs to know
      if (state.current_time <= 0) {
          return state;
      }
      let newtime = state.current_time - 1;
      let diff = state.time_limit - newtime;
      let newswitchflag = state.is_switch_time;
      let player_order = state.player_ordering.slice();

      if (!newswitchflag && diff % state.dead_time == 0) {
          newswitchflag = true;
      } else if (newswitchflag && diff % (state.switch_time + state.dead_time) == 0) {
          newswitchflag = false;
          player_order.push(player_order.shift());
          //next player can now write
      }
      
      return Object.assign({}, state, {
          starttime_utc : state.starttime_utc,
          time_limit : state.time_limit,
          switch_time : state.switch_time,
          dead_time : state.dead_time,
          problem : state.problem,
          test_cases : state.test_cases,
          player_ordering : player_order,

          current_time : newtime,
          is_switch_time : newswitchflag
      })

    default:
      return state;
  }
}
