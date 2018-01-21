import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

class BaseEditor extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.players && this.props.players.length > 0) {
            let enabled = this.props.players[0] == this.props.you && this.props.is_switch_time;

            const node = ReactDOM.findDOMNode(this.refs.root);
            const editor = ace.edit(node);
            editor.setReadOnly(!enabled);
            editor.getSession().setMode("ace/mode/python");
            if (enabled) {
                editor.setTheme("ace/theme/monokai");
            } else {
                editor.setTheme("ace/theme/clouds");
            }
        }
    }

    render() {
        return (
            <div>
            <div id="firepad" ref="root"></div>
            <div id="error-box">(Errors show here)</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    players: state.round.player_ordering,
    you: state.players.you.you,
    is_switch_time: state.round.is_switch_time
});

const Editor = connect(
  mapStateToProps,
  null
)(BaseEditor);

export default Editor;
