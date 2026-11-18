jest.mock('node-fetch');

const fetch = require('node-fetch');
const rawg = require('../src/services/rawg');

const game = {
  id: 3498,
  name: 'Grand Theft Auto V',
  background_image: 'https://example.com/gta.jpg',
  genres: [{ name: 'Action' }, { name: 'Adventure' }],
  rating: 4.47,
  rating_top: 5,
  released: '2013-09-17',
  platforms: [{ platform: { name: 'PC' } }, { platform: { name: 'PlayStation 5' } }],
  description: 'An open world game.',
};

const respondWith = (body, ok = true, status = 200) =>
  fetch.mockResolvedValue({ ok, status, json: async () => body });

beforeEach(() => jest.resetAllMocks());

describe('mappers', () => {
  it('summarizes a game for the catalog', () => {
    expect(rawg.toSummary(game)).toEqual({
      id: 3498,
      image: 'https://example.com/gta.jpg',
      name: 'Grand Theft Auto V',
      genres: ['Action', 'Adventure'],
      rating: 4.47,
    });
  });

  it('builds the detail of a game', () => {
    expect(rawg.toDetail(game)).toMatchObject({
      release: '2013-09-17',
      rating: '4.47 / 5',
      platforms: ['PC', 'PlayStation 5'],
      description: 'An open world game.',
    });
  });
});

describe('RAWG requests', () => {
  it('lists a page of games', async () => {
    respondWith({ results: [game] });

    const games = await rawg.listGames({ page: 2, pageSize: 7 });

    const url = fetch.mock.calls[0][0];
    expect(url).toContain('https://api.rawg.io/api/games?');
    expect(url).toContain('page=2');
    expect(url).toContain('page_size=7');
    expect(games).toHaveLength(1);
  });

  it('searches games by name', async () => {
    respondWith({ results: [game] });

    await rawg.searchGames('grand theft');

    expect(fetch.mock.calls[0][0]).toContain('search=grand+theft');
  });

  it('loads the detail of a game', async () => {
    respondWith(game);

    const detail = await rawg.getGame(3498);

    expect(fetch.mock.calls[0][0]).toContain('/games/3498?');
    expect(detail.name).toBe('Grand Theft Auto V');
  });

  it('lists genre names', async () => {
    respondWith({ results: [{ name: 'Action' }, { name: 'Indie' }] });

    expect(await rawg.listGenres()).toEqual(['Action', 'Indie']);
  });

  it('fails with a 502 when RAWG answers with an error', async () => {
    respondWith({}, false, 401);

    await expect(rawg.listGames()).rejects.toMatchObject({ status: 502 });
  });
});
