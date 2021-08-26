export const GET_GAMES = 'GET_GAMES'


export function getGames() {
    return function (dispatch) {
        return fetch('http://localhost:3001/games')
            .then(data => data.json())
            .then(json => {
                dispatch({ type: "GET_GAMES", payload: json })
            })
    }
}