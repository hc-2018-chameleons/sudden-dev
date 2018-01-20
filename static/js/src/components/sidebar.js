import React, {Component} from 'react'
import {connect} from 'react-redux'

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
          <h2 id="others-tag">Other stuff</h2>
          <h2 id="test-cases-tag">Test Cases</h2>
          <ul>
              {
                  this.props.test_cases.map(function(data, i) {
                      return <button id="test-case" type="button" className="btn btn-primary" key={i}>{data}</button>
                  })
              }
          </ul>
          <ul>
              {
                  this.props.player_ordering.map(function(data, i) {
                    return <button id="player-button" type="button" className="btn btn-warning" key={i}>See {data}'s code</button>
                  })
              }
          </ul>
          
          <button id="player-button" type="button" className="btn btn-danger">Run</button>

          <div id="turn-duration">

          <p id="clock-text">
            starttime {this.props.starttime_utc} <br/>
            switchtime {this.props.switch_time} <br/>
            deadtime {this.props.dead_time}
          </p>

            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    starttime_utc : state.round.starttime_utc,
    switch_time : state.round.switch_time,
    dead_time : state.round.dead_time,
    player_ordering : state.round.player_ordering,
    problem : state.round.problem,
    test_cases : state.round.test_cases,
});

const ActiveSidebar = connect(
  mapStateToProps,
  null
)(Sidebar);

export default ActiveSidebar;
