export default (items = []) => {
  const ids = items.map((item) => item.id);
  const entities = items
    .map((item) => ({ [item.id]: item }))
    .reduce((acc, current) => ({ ...acc, ...current }), {});
  return { ids, entities };
};
