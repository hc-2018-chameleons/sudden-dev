import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerList extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        const player_sidebar_limit = Object.keys(this.props.players).length;
        let player_buttons = []

        for (let i = 0; i < player_sidebar_limit; i++) {
            let index = this.props.player_inds[i % this.props.player_inds.length];
            player_buttons.push(this.props.players[index]);
        }
console.log(player_buttons)
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
    player_inds: state.round.player_ordering,
    players: state.players.players,
    you: state.players.you
});

const ActivePlayerList = connect(
  mapStateToProps,
  null
)(PlayerList);

export default ActivePlayerList;
