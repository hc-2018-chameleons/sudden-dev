import React, {Component} from 'react'
import {connect} from 'react-redux'

class Editor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="firepad"></div>
        );
    }
}

export default Editor;
