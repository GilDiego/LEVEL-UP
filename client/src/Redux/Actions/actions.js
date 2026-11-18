import { API_URL } from '../../config';

export const GET_GAMES = 'GET_GAMES';
export const FETCH_DB = 'FETCH_DB';
export const SEARCH_GAMES = 'SEARCH_GAMES';
export const SEARCH_GAME_ID = 'SEARCH_GAME_ID';

const load = (path, type) => (dispatch) =>
  fetch(`${API_URL}${path}`)
    .then((response) => response.json())
    .then((payload) => dispatch({ type, payload }));

export const getGames = (page) => load(`/games?page=${page}`, GET_GAMES);

export const fetchDB = () => load('/gamesDB', FETCH_DB);

export const searchGames = (name) => (dispatch) => {
  if (!name) return dispatch({ type: SEARCH_GAMES, payload: [] });

  return load(`/games?name=${encodeURIComponent(name)}`, SEARCH_GAMES)(dispatch);
};

export const searchId = (id) => load(`/games/${id}`, SEARCH_GAME_ID);
