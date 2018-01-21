import React, {Component} from 'react'
import {connect} from 'react-redux'

class ProblemBar extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
        <div id="problem-display">
          <h2 id="your-task">Your Task:</h2>
          <p id="problem-itself">
          {this.props.problem}
          </p>

        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    problem: state.round.problem
});

const ActiveProblemBar = connect(
  mapStateToProps,
  null
)(ProblemBar);

export default ActiveProblemBar;
