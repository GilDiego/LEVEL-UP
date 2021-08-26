export const GET_GAMES = 'GET_GAMES'
export const FETCH_DB = 'FETCH_DB'
export const SEARCH_GAMES = 'SEARCH_GAMES'


export function getGames() {
    return function (dispatch) {
        return fetch('http://localhost:3001/games')
            .then(data => data.json())
            .then(json => {
                dispatch({ type: "GET_GAMES", payload: json })
            })
    }
}

export function fetchDB() {
    return function (dispatch) {
        return fetch('http://localhost:3001/gamesDB')
            .then(data => data.json())
            .then(json => {
                dispatch({ type: "FETCH_DB", payload: json })
            })
    }
}

export function searchGames(name) {
    return function (dispatch) {
        if (!name) {
            return dispatch({ type: "SEARCH_GAMES", payload: [] })
        }
        else return fetch('http://localhost:3001/games?name=' + name)
            .then(data => data.json())
            .then(json => {
                dispatch({ type: "SEARCH_GAMES", payload: json })
            })
    }
}