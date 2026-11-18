import { validateGame, toggleValue } from './validate';

const validGame = {
  name: 'Destiny 3',
  description: 'A shared-world shooter',
  release: '2026-01-01',
  rating: '4',
  genres: ['Action'],
  platforms: 'PC ',
};

describe('validateGame', () => {
  it('accepts a complete game', () => {
    expect(validateGame(validGame)).toEqual({});
  });

  it('reports every missing field on an empty form', () => {
    const errors = validateGame({
      name: '',
      description: '',
      release: '',
      rating: '',
      genres: [],
      platforms: '',
    });

    expect(Object.keys(errors).sort()).toEqual([
      'description',
      'genres',
      'name',
      'platforms',
      'rating',
      'release',
    ]);
  });

  it('requires a name of at least 4 characters', () => {
    expect(validateGame({ ...validGame, name: 'Hi' }).name).toMatch(/at least 4/);
  });

  it('requires a description of at least 8 characters', () => {
    expect(validateGame({ ...validGame, description: 'short' }).description).toMatch(/at least 8/);
  });

  it.each(['0', '6', 'abc', '4.5'])('rejects the rating %s', (rating) => {
    expect(validateGame({ ...validGame, rating }).rating).toBe('Rating must be between 1 and 5');
  });

  it('treats blank platforms as missing', () => {
    expect(validateGame({ ...validGame, platforms: '   ' }).platforms).toBeDefined();
  });
});

describe('toggleValue', () => {
  it('adds a checked value', () => {
    expect(toggleValue(['PC'], 'Xbox', true)).toEqual(['PC', 'Xbox']);
  });

  it('removes an unchecked value', () => {
    expect(toggleValue(['PC', 'Xbox'], 'PC', false)).toEqual(['Xbox']);
  });
});
