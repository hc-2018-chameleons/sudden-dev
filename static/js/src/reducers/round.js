import * as actions from "../actions/round";

// Synchronize player order list
function shiftPlayerList(switch_time, dead_time, elapsed, time_limit, order) {
    let no_of_turns = Math.floor(time_limit / (switch_time + dead_time));

    let cur_turn = Math.floor(elapsed / time_limit * no_of_turns);
    let cur_player = cur_turn % order.length;

    let players = order;
    for (let i = 0; i < cur_player; i++) {
        players.push(players.shift());
    }

    return players;
}

export default function roundReducer(state = [], action) {
  switch (action.type) {
    case actions.START_ROUND:
      let utc = Math.round(new Date().getTime() / 1000);
      let elapsed = utc - action.round.round.starttime_utc;
      if (elapsed < 0) {
          elapsed = 0;
      }
      let current_time = action.round.round.time_limit - elapsed;

      let switch_time = 5;
      let dead_time = 3;

      let players = shiftPlayerList(switch_time, dead_time, elapsed, action.round.round.time_limit, action.round.round.player_ordering);

      let turn_time = elapsed % (switch_time + dead_time);
      let is_sw_time = turn_time >= dead_time;

      return Object.assign({}, state, {
          starttime_utc : action.round.round.starttime_utc,
          time_limit : action.round.round.time_limit,
          switch_time : switch_time,
          dead_time : dead_time,
          player_ordering : action.round.round.player_ordering,
          problem : action.round.round.problem,

          test_case_inputs : action.round.round.test_case_inputs,
          test_case_outputs : action.round.round.test_case_outputs,

          current_time : current_time,
          is_switch_time : is_sw_time
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
          test_case_inputs : state.test_case_inputs,
          test_case_outputs : state.test_case_outputs,
          player_ordering : player_order,

          current_time : newtime,
          is_switch_time : newswitchflag
      })

    default:
      return state;
  }
}
