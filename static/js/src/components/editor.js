import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

class BaseEditor extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        //TODO:yadadaydyad
        let enabled = this.props.players[0] == 'Thi' && this.props.is_switch_time;

        const node = ReactDOM.findDOMNode(this.refs.root);
        const editor = ace.edit(node);
        editor.setReadOnly(!enabled);
        editor.getSession().setMode("ace/mode/javascript");
        if (enabled) {
            editor.setTheme("ace/theme/monokai");
        } else {
            editor.setTheme("ace/theme/clouds");
        }

    }

    render() {
        return (
            <div id="firepad" ref="root"></div>
        );
    }
}

const mapStateToProps = (state) => ({
    players: state.round.player_ordering,
    is_switch_time: state.round.is_switch_time
});

const Editor = connect(
  mapStateToProps,
  null
)(BaseEditor);

export default Editor;
