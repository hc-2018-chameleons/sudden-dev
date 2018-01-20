export default function playerBar(state = {}, action) {
    switch (action.type) {
        case 'ADD_PLAYER':
            Object.assign({}, state, {
                players: [
                    ...state.players,
                    action.text
                ]
            })
        case 'REMOVE_PLAYER':
        default:
            return state;
    }
}
