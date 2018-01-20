import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerList extends Component {
    constructor(props) {
        super(props);
        console.log(props.players);
    }

    render() {
        return (
        <div>
            <ul>
                {
                    //TODO: make this into buttons or sth
                    this.props.players.map(function(data, i) {
                        return <li key={i}>{data.player}</li>
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
