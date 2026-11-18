export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_SOURCES = 'SET_SOURCES';
export const SET_PAGE = 'SET_PAGE';
export const SET_LOADING = 'SET_LOADING';

export const setSources = (API, DB) => ({
  type: SET_SOURCES,
  payload: { API, DB },
});

export const setOptionsSelected = (rating, order) => ({
  type: SET_OPTIONS,
  payload: { rating, order },
});

export const setPageSelected = (number) => ({
  type: SET_PAGE,
  payload: Number(number),
});

export const setLoading = (value) => ({ type: SET_LOADING, payload: value });
