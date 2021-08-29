import { SET_OPTIONS, SET_SOURCES } from "../Actions/buttonsActions";

const initialState = {
    sources: {},
    optionsSelected: {},
}

function buttonsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SOURCES:
            return {
                ...state,
                sources: action.payload
            }
        case SET_OPTIONS:
            return {
                ...state,
                optionsSelected: action.payload
            }
        default:
            return state
    }
}

export default buttonsReducer