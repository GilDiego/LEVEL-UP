import gamesReducer from './Reducers/reducer';
import buttonsReducer from './Reducers/buttonsReducer';
import { GET_GAMES, FETCH_DB, SEARCH_GAMES, SEARCH_GAME_ID } from './Actions/actions';
import {
  setSources,
  setOptionsSelected,
  setPageSelected,
  setLoading,
} from './Actions/buttonsActions';

describe('gamesReducer', () => {
  const initial = gamesReducer(undefined, { type: '@@INIT' });

  it('starts empty', () => {
    expect(initial).toEqual({
      gamesLoaded: [],
      gamesDB: [],
      gamesSeached: [],
      gameObject: {},
    });
  });

  it.each([
    [GET_GAMES, 'gamesLoaded', [{ id: 1 }]],
    [FETCH_DB, 'gamesDB', [{ id: 2 }]],
    [SEARCH_GAMES, 'gamesSeached', [{ id: 3 }]],
    [SEARCH_GAME_ID, 'gameObject', { id: 4 }],
  ])('stores the payload of %s', (type, key, payload) => {
    expect(gamesReducer(initial, { type, payload })[key]).toEqual(payload);
  });

  it('ignores unknown actions', () => {
    expect(gamesReducer(initial, { type: 'UNKNOWN' })).toBe(initial);
  });
});

describe('buttonsReducer', () => {
  const initial = buttonsReducer(undefined, { type: '@@INIT' });

  it('starts on the first page, loading', () => {
    expect(initial.pageSelected).toBe(1);
    expect(initial.loading).toBe(true);
  });

  it('stores the selected sources and sort options', () => {
    let state = buttonsReducer(initial, setSources(true, false));
    state = buttonsReducer(state, setOptionsSelected('Highest-first', 'asc'));

    expect(state.sources).toEqual({ API: true, DB: false });
    expect(state.optionsSelected).toEqual({ rating: 'Highest-first', order: 'asc' });
  });

  it('converts the page to a number', () => {
    expect(buttonsReducer(initial, setPageSelected('3')).pageSelected).toBe(3);
  });

  it('toggles the loading flag', () => {
    expect(buttonsReducer(initial, setLoading(false)).loading).toBe(false);
  });
});
