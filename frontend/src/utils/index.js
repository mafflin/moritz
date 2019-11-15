export const convertArrayToObject = (array, key = 'id') => array
  .map((item) => ({ [item[key]]: item }))
  .reduce((acc, current) => ({ ...acc, ...current }), {});
