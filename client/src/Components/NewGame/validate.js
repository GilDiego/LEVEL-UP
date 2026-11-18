export function validateGame(form) {
  const errors = {};

  if (!form.name) errors.name = 'Name is required';
  else if (form.name.length < 4) errors.name = 'Name must have at least 4 characters';

  if (!form.description) errors.description = 'Description is required';
  else if (form.description.length < 8) {
    errors.description = 'Description must have at least 8 characters';
  }

  if (!form.release) errors.release = 'Release is required';

  if (!form.rating) errors.rating = 'Rating is required';
  else if (!/^[1-5]$/.test(form.rating)) errors.rating = 'Rating must be between 1 and 5';

  if (!form.genres.length) errors.genres = 'Genres is required';
  if (!form.platforms.trim().length) errors.platforms = 'Platforms is required';

  return errors;
}

export const toggleValue = (list, value, checked) =>
  checked ? [...list, value] : list.filter((item) => item !== value);
