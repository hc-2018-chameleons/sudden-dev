import React, {Component} from 'react'
import {connect} from 'react-redux'

class BaseEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="firepad"></div>
        );
    }
}

const mapStateToProps = (state) => ({
    players: state.round.player_ordering,
});

const Editor = connect(
  mapStateToProps,
  null
)(BaseEditor);

export default Editor;
