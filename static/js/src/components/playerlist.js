import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class PlayerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {
                    this.props.playerBar.map((player) => {
                        return <li>player</li>;
                    })
                }
            </ul>
        );
    }
}
