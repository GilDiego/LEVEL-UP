import { filterAPI, filterDB, filterAlphabetically, filterByRating } from './functions';

const apiGame = { name: 'portal', rating: 4.5 };
const storedGame = { name: 'Alpha', rating: 3 };
const lateGame = { name: 'Zelda', rating: 5 };

describe('source filters', () => {
  it('keeps everything when both sources are enabled', () => {
    const games = [apiGame, storedGame];

    expect(filterAPI(games, { API: true }, [apiGame])).toEqual(games);
    expect(filterDB(games, { DB: true }, [storedGame])).toEqual(games);
  });

  it('drops the external games when the API source is off', () => {
    expect(filterAPI([apiGame, storedGame], { API: false }, [apiGame])).toEqual([storedGame]);
  });

  it('drops the stored games when the database source is off', () => {
    expect(filterDB([apiGame, storedGame], { DB: false }, [storedGame])).toEqual([apiGame]);
  });
});

describe('filterAlphabetically', () => {
  const games = [lateGame, apiGame, storedGame];

  it('sorts ascending ignoring case', () => {
    expect(filterAlphabetically(games, { order: 'asc' }).map((g) => g.name)).toEqual([
      'Alpha',
      'portal',
      'Zelda',
    ]);
  });

  it('sorts descending', () => {
    expect(filterAlphabetically(games, { order: 'desc' }).map((g) => g.name)).toEqual([
      'Zelda',
      'portal',
      'Alpha',
    ]);
  });

  it('returns the list untouched without an order', () => {
    expect(filterAlphabetically(games, {})).toBe(games);
  });

  it('does not mutate the original list', () => {
    const original = [...games];

    filterAlphabetically(games, { order: 'asc' });

    expect(games).toEqual(original);
  });
});

describe('filterByRating', () => {
  const games = [apiGame, lateGame, storedGame];

  it('sorts from the lowest rating', () => {
    expect(filterByRating(games, { rating: 'Lowest-first' }).map((g) => g.rating)).toEqual([
      3, 4.5, 5,
    ]);
  });

  it('sorts from the highest rating', () => {
    expect(filterByRating(games, { rating: 'Highest-first' }).map((g) => g.rating)).toEqual([
      5, 4.5, 3,
    ]);
  });

  it('returns the list untouched without a rating option', () => {
    expect(filterByRating(games, {})).toBe(games);
  });
});
