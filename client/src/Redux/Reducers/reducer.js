import { GET_GAMES, FETCH_DB, SEARCH_GAMES, SEARCH_GAME_ID } from "../Actions/actions.js";

const initialState = {
    gamesLoaded: [],
    gamesDB: [],
    gamesSeached: [],
    gameObject: {}
}

function gamesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                gamesLoaded: action.payload
            }
        case FETCH_DB:
            return {
                ...state,
                gamesDB: action.payload
            }
        case SEARCH_GAMES:
            return {
                ...state,
                gamesSeached: action.payload
            }
        case SEARCH_GAME_ID:
            return {
                ...state,
                gameObject: action.payload
            }
        default:
            return state
    }
}

export default gamesReducer