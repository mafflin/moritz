export default (items = []) => {
  const ids = items.map((item) => item.id);
  const entities = items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
  return { ids, entities };
};
