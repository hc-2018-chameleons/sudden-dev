import React, {Component} from 'react'
import {connect} from 'react-redux'
import runit from '../skulpt-run.js'

function getCode() {
    let editor = ace.edit('firepad');
    return editor.getValue();
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {code:''};
    }

    componentDidUpdate() {
        this.state.code = getCode();
    }

    render() {
        if (this.props.time_limit && this.props.players && this.props.player_ordering) {
            var current_player = this.props.players[this.props.player_ordering[0]];
            if (this.props.is_switch_time) {
                var message = "It's " + current_player + "'s turn!"
            } else {
                var message = "Get ready, " + current_player + "!"
                }
        return (
            <div>
            <h2 id="test-cases-tag">Test Cases</h2>
                {
                    this.props.test_case_inputs.map(function(data, i) {
                        return <button id="test-case" type="button" className="btn btn-primary" key={i}>Test case: {i+1}</button>
                    }.bind(this))
                }
            <div>
                {/*{
                    this.props.player_ordering.map(function(data, i) {
                        return <button id="player-button" type="button" className="btn btn-warning" key={i}>See {data}s code</button>
                    })
                }*/}
                {<button id="run-button" type="button" className="btn btn-danger" onClick={() => runit(this.state.code, this.props.test_case_inputs, this.props.test_case_outputs)}>Run</button>}
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
        } else {
            return <h1>Waiting for players</h1>;
        }
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
    test_case_inputs : state.round.test_case_inputs,
    test_case_outputs : state.round.test_case_outputs,
    is_switch_time : state.round.is_switch_time,

    players : state.players.players.players,
    you : state.players.you
});

const ActiveSidebar = connect(
  mapStateToProps,
  null
)(Sidebar);

export default ActiveSidebar;
