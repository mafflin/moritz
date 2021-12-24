export default (items = [], key = 'id') => {
  const ids = items.map((item) => item[key]);
  const entities = items.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {});
  return { ids, entities };
};
