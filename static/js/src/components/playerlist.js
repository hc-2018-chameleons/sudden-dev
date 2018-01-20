import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <h2 id="players-tag">Players</h2>
            <ul>
                {
                    //TODO: make this into buttons or sth
                    this.props.players.map(function(data, i) {
                        return <button id="player-button" type="button" className="btn btn-primary" key={i}>{data.player}</button>
                    })
                }
            </ul>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    players: state.players,
});

const ActivePlayerList = connect(
  mapStateToProps,
  null
)(PlayerList);

export default ActivePlayerList;
