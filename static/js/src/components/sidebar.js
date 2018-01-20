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
          <button id="player-button" type="button" className="btn btn-warning">see other players lines1</button>
          <button id="player-button" type="button" className="btn btn-warning">see other players lines2</button>
          <button id="player-button" type="button" className="btn btn-danger">Run</button>
          <div id="turn-duration">

          <p id="clock-text">
             clock here?
          </p>

            </div>
        </div>
        );
    }
}

export default Sidebar;
