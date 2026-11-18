export function filterAPI(games, sources, apiGames) {
  if (sources.API === false) return games.filter((game) => !apiGames.includes(game));
  return games;
}

export function filterDB(games, sources, storedGames) {
  if (sources.DB === false) return games.filter((game) => !storedGames.includes(game));
  return games;
}

export function filterAlphabetically(games, options) {
  const byName = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());

  if (options.order === 'asc') return [...games].sort(byName);
  if (options.order === 'desc') return [...games].sort((a, b) => byName(b, a));
  return games;
}

export function filterByRating(games, options) {
  if (options.rating === 'Lowest-first') return [...games].sort((a, b) => a.rating - b.rating);
  if (options.rating === 'Highest-first') return [...games].sort((a, b) => b.rating - a.rating);
  return games;
}
