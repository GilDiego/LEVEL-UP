import { SET_OPTIONS, SET_SOURCES, SET_PAGE, SET_LOADING } from "../Actions/buttonsActions";

const initialState = {
    sources: {},
    optionsSelected: {},
    pageSelected: 1,
    loading: true
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
        case SET_PAGE:
            return {
                ...state,
                pageSelected: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

export default buttonsReducer