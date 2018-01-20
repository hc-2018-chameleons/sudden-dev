import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerList extends Component {
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

const mapStateToProps = state => {
    return {
        playerBar : state.playerBar
    }
}

const VisiblePlayerList = connect(
    mapStateToProps
)(PlayerList)

export default VisiblePlayerList
