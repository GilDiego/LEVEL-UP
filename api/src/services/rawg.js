const fetch = require('node-fetch');
const { rawgKey } = require('../config');

const BASE_URL = 'https://api.rawg.io/api';
const PAGE_SIZE = 10;

const toSummary = (game) => ({
  id: game.id,
  image: game.background_image,
  name: game.name,
  genres: game.genres.map((genre) => genre.name),
  rating: game.rating,
});

const toDetail = (game) => ({
  id: game.id,
  image: game.background_image,
  name: game.name,
  genres: game.genres.map((genre) => genre.name),
  release: game.released,
  rating: `${game.rating} / ${game.rating_top}`,
  platforms: game.platforms.map((item) => item.platform.name),
  description: game.description,
});

const request = async (path, params = {}) => {
  const query = new URLSearchParams({ key: rawgKey, ...params });
  const response = await fetch(`${BASE_URL}/${path}?${query}`);

  if (!response.ok) {
    const error = new Error(`RAWG responded with status ${response.status}`);
    error.status = 502;
    throw error;
  }

  return response.json();
};

const listGames = async ({ page = 1, pageSize = PAGE_SIZE } = {}) => {
  const data = await request('games', { page, page_size: pageSize });
  return data.results.map(toSummary);
};

const searchGames = async (name) => {
  const data = await request('games', { search: name, page_size: PAGE_SIZE });
  return data.results.map(toSummary);
};

const getGame = async (id) => toDetail(await request(`games/${encodeURIComponent(id)}`));

const listGenres = async () => {
  const data = await request('genres');
  return data.results.map((genre) => genre.name);
};

module.exports = { PAGE_SIZE, toSummary, toDetail, listGames, searchGames, getGame, listGenres };
