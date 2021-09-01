export const SET_OPTIONS = 'SET_OPTIONS'
export const SET_SOURCES = 'SET_SOURCES'
export const SET_PAGE = 'SET_PAGE'
export const SET_LOADING = 'SET_LOADING'

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
export function setPageSelected(number) {
    return function (dispatch) {
        let page;
        return (
            page = Number(number),
            dispatch({ type: "SET_PAGE", payload: page }))

    }
}
export function setLoading(value) {
    return function (dispatch) {
        let loading = true;
        return (
            loading = value,
            dispatch({ type: "SET_LOADING", payload: loading }))

    }
}