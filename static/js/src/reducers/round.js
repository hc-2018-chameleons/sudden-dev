import * as actions from "../actions/round";

// Synchronize player order list
function shiftPlayerList(elapsed, action) {
    let sw_time = action.round.switch_time;
    let d_time = action.round.dead_time;
    let no_of_turns = Math.floor(action.round.time_limit / (sw_time + d_time));

    let cur_turn = Math.floor(elapsed / action.round.time_limit * no_of_turns);
    let cur_player = cur_turn % action.round.player_ordering.length;

    let players = action.round.player_ordering;
    for (let i = 0; i < cur_player; i++) {
        players.push(players.shift());
    }

    return players;
}

export default function roundReducer(state = [], action) {
  switch (action.type) {
    case actions.START_ROUND:
      let utc = new Date().getTime();
      let elapsed = utc - action.round.starttime_utc;
      let current_time = action.round.time_limit - elapsed;

      let players = shiftPlayerList(elapsed, action);

      let turn_time = elapsed % (action.round.switch_time + action.round.dead_time);
      let is_sw_time = turn_time >= action.round.dead_time;

      return Object.assign({}, state, {
          starttime_utc : action.round.starttime_utc,
          time_limit : action.round.time_limit,
          switch_time : action.round.switch_time,
          dead_time : action.round.dead_time,
          player_ordering : players,
          problem : action.round.problem,
          test_cases : action.round.test_cases,

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
          test_cases : state.test_cases,
          player_ordering : player_order,

          current_time : newtime,
          is_switch_time : newswitchflag
      })

    default:
      return state;
  }
}
