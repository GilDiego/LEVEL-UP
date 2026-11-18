const request = require('supertest');

jest.mock('../src/db', () => ({
  Videogame: { findAll: jest.fn(), create: jest.fn() },
  Genre: { findAll: jest.fn(), findOrCreate: jest.fn(), bulkCreate: jest.fn() },
  conn: {},
}));
jest.mock('../src/services/rawg', () => ({
  PAGE_SIZE: 10,
  listGames: jest.fn(),
  searchGames: jest.fn(),
  getGame: jest.fn(),
  listGenres: jest.fn(),
}));

const { Videogame, Genre } = require('../src/db');
const rawg = require('../src/services/rawg');
const app = require('../src/app');

const storedGame = (name, genres) => ({
  toJSON: () => ({ id: 1, name }),
  genres: genres.map((genreName) => ({ name: genreName })),
});

beforeEach(() => jest.resetAllMocks());

describe('GET /games', () => {
  it('searches the external catalog by name', async () => {
    rawg.searchGames.mockResolvedValue([{ name: 'Portal' }]);

    const res = await request(app).get('/games').query({ name: 'portal' });

    expect(rawg.searchGames).toHaveBeenCalledWith('portal');
    expect(res.body).toEqual([{ name: 'Portal' }]);
  });

  it('leaves room on the first page for the stored games', async () => {
    Videogame.findAll.mockResolvedValue([storedGame('Mine', ['Indie'])]);
    rawg.listGames.mockResolvedValue([]);

    await request(app).get('/games').query({ page: 1 });

    expect(rawg.listGames).toHaveBeenCalledWith({ page: '1', pageSize: 9 });
  });

  it('requests full pages after the first', async () => {
    Videogame.findAll.mockResolvedValue([storedGame('Mine', [])]);
    rawg.listGames.mockResolvedValue([]);

    await request(app).get('/games').query({ page: 3 });

    expect(rawg.listGames).toHaveBeenCalledWith({ page: '3', pageSize: 10 });
  });

  it('answers 502 when the external API fails', async () => {
    Videogame.findAll.mockResolvedValue([]);
    rawg.listGames.mockRejectedValue(Object.assign(new Error('RAWG down'), { status: 502 }));

    const res = await request(app).get('/games').query({ page: 1 });

    expect(res.status).toBe(502);
    expect(res.text).toBe('RAWG down');
  });
});

describe('GET /games/:id', () => {
  it('returns the detail of a game', async () => {
    rawg.getGame.mockResolvedValue({ id: 7, name: 'Portal' });

    const res = await request(app).get('/games/7');

    expect(rawg.getGame).toHaveBeenCalledWith('7');
    expect(res.body).toEqual({ id: 7, name: 'Portal' });
  });
});

describe('GET /gamesDB', () => {
  it('returns stored games with plain genre names', async () => {
    Videogame.findAll.mockResolvedValue([storedGame('Mine', ['Indie', 'Puzzle'])]);

    const res = await request(app).get('/gamesDB');

    expect(res.body).toEqual([{ id: 1, name: 'Mine', genres: ['Indie', 'Puzzle'] }]);
  });
});

describe('GET /genres', () => {
  it('serves the stored genres when there are some', async () => {
    Genre.findAll.mockResolvedValue([{ name: 'Action' }]);

    const res = await request(app).get('/genres');

    expect(res.body).toEqual([{ name: 'Action' }]);
    expect(rawg.listGenres).not.toHaveBeenCalled();
  });

  it('loads the genres from the external API the first time', async () => {
    Genre.findAll.mockResolvedValueOnce([]).mockResolvedValueOnce([{ name: 'Action' }]);
    rawg.listGenres.mockResolvedValue(['Action']);

    const res = await request(app).get('/genres');

    expect(Genre.bulkCreate).toHaveBeenCalledWith([{ name: 'Action' }]);
    expect(res.body).toEqual([{ name: 'Action' }]);
  });
});

describe('POST /new', () => {
  it('stores a videogame and links its genres', async () => {
    const created = { id: 9, setGenres: jest.fn() };
    Videogame.create.mockResolvedValue(created);
    Genre.findOrCreate.mockResolvedValue([{ id: 1, name: 'Indie' }, true]);

    const res = await request(app)
      .post('/new')
      .send({
        name: 'Mine',
        description: 'My game',
        rating: '4',
        genres: ['Indie'],
        platforms: 'PC',
      });

    expect(Videogame.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Mine', rating: 4 })
    );
    expect(created.setGenres).toHaveBeenCalledWith([{ id: 1, name: 'Indie' }]);
    expect(res.status).toBe(200);
  });

  it('answers 500 when the videogame cannot be stored', async () => {
    Videogame.create.mockRejectedValue(new Error('duplicate name'));

    const res = await request(app).post('/new').send({ name: 'Mine' });

    expect(res.status).toBe(500);
  });
});
