import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const player_sidebar_limit = 10;
        let player_buttons = []

        for (let i = 0; i < player_sidebar_limit; i++) {
            player_buttons.push(this.props.players[i % this.props.players.length])
        }

        return (
        <div>
            <h2 id="players-tag">Players</h2>
            <ul>
                {
                    //TODO: make this into buttons or sth
                    player_buttons.map(function(data, i) {
                        return <button id="player-button" type="button" className="btn btn-primary" key={i}>{data}</button>
                    })
                }
            </ul>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    players: state.round.player_ordering,
});

const ActivePlayerList = connect(
  mapStateToProps,
  null
)(PlayerList);

export default ActivePlayerList;
