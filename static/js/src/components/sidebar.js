import React, {Component} from 'react'
import {connect} from 'react-redux'

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var current_player = this.props.player_ordering[0];
        if (this.props.is_switch_time) {
            var message = "It's " + current_player + "'s turn!"
        } else {
            var message = "Get ready, " + current_player + "!"
        }
        return (
        <div>
          <h2 id="test-cases-tag">Test Cases</h2>
              {
                  this.props.test_cases.map(function(data, i) {

                      return <div> <button id="test-case" type="button" className="btn btn-primary" key={i}>Test case: {i+1}</button> </div>
                  })
              }
          <div>
              {/*{
                  this.props.player_ordering.map(function(data, i) {
                    return <button id="player-button" type="button" className="btn btn-warning" key={i}>See {data}s code</button>
                  })
              }*/}
              <button id="run-button" type="button" className="btn btn-danger">Run</button>
          </div>


          <div id="turn-duration">

          <p id="clock-text">
            {this.props.current_time}/{this.props.time_limit}
          </p>
          <p id="whos-turn">
            {message}
            </p>
            starttime {this.props.starttime_utc} <br/>
            switchtime {this.props.switch_time} <br/>
            deadtime {this.props.dead_time}

            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    starttime_utc : state.round.starttime_utc,
    time_limit : state.round.time_limit,
    current_time : state.round.current_time,
    switch_time : state.round.switch_time,
    dead_time : state.round.dead_time,
    player_ordering : state.round.player_ordering,
    problem : state.round.problem,
    test_cases : state.round.test_cases,
    is_switch_time : state.round.is_switch_time,
});

const ActiveSidebar = connect(
  mapStateToProps,
  null
)(Sidebar);

export default ActiveSidebar;
