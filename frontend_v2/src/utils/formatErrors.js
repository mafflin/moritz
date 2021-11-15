export default (errors = {}) => Object.entries(errors)
  .map(([key, value]) => ({ [key]: Array.isArray(value) ? value.join(' ') : value }))
  .reduce((acc, current) => ({ ...acc, ...current }), {});
