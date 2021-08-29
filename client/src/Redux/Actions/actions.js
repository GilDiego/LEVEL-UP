export const GET_GAMES = 'GET_GAMES'
export const FETCH_DB = 'FETCH_DB'
export const SEARCH_GAMES = 'SEARCH_GAMES'
export const SEARCH_GAME_ID = 'SEARCH_GAME_ID'


export function getGames(page) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/games?page=${page}`)
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

export function searchId(id) {
    return function (dispatch) {
        return fetch('http://localhost:3001/games/' + id)
            .then(data => data.json())
            .then(json => {
                dispatch({ type: "SEARCH_GAME_ID", payload: json })
            })
    }
}