import { GET_GAMES } from "../Actions/actions.js";

const initialState = {
    gamesLoaded: [],
}

function gamesReducer(state = initialState, action) {

    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                gamesLoaded: action.payload
            }
        default:
            return state

    }
}

export default gamesReducer