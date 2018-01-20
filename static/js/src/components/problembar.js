import React, {Component} from 'react'
import {connect} from 'react-redux'

class ProblemBar extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
        <div>
          <h2 id="problem-bar">Current Problem: {this.props.problem}</h2>
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
