export const SET_OPTIONS = 'SET_OPTIONS'
export const SET_SOURCES = 'SET_SOURCES'

export function setSources(API, DB) {
    return function (dispatch) {
        let obj = {}
        return (
            obj = { API, DB },
            dispatch({ type: "SET_SOURCES", payload: obj }))

    }
}
export function setOptionsSelected(rating, order) {
    return function (dispatch) {
        let obj = {}
        return (
            obj = {
                rating: rating,
                order: order
            },
            dispatch({ type: "SET_OPTIONS", payload: obj }))

    }
}