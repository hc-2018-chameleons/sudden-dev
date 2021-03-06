import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.players) {
            let order = []
            if (this.props.player_inds) {
                order = this.props.player_inds;
            } else {
                order = Object.keys(this.props.players);
            }

            const player_sidebar_limit = order.length;
            let player_buttons = []
            let ids = []

            for (let i = 0; i < player_sidebar_limit; i++) {
                let index = order[i % order.length];
                player_buttons.push(this.props.players[index]);

                /* Highlight current player */
                if (index == this.props.you) {
                    ids.push('player-current-button');
                } else {
                    ids.push('player-button');
                }
            }
            return (
            <div>
                <h2 id="players-tag">Players</h2>
                <ul>
                    {
                        //TODO: make this into buttons or sth
                        player_buttons.map(function(data, i) {
                            return <button id={ids[i]} type="button" className="btn btn-primary" key={i}>{data}</button>
                        })
                    }
                </ul>
            </div>
            );
        } else {
            return <h1>Waiting for players</h1>
        }
    }
}

const mapStateToProps = (state) => ({
    player_inds: state.round.player_ordering,
    players: state.players.players.players,
    you: state.players.you.you
});

const ActivePlayerList = connect(
  mapStateToProps,
  null
)(PlayerList);

export default ActivePlayerList;
