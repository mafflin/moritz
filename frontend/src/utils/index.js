export const convertArrayToObject = (array, key = 'id') => array
  .map((item) => ({ [item[key]]: item }))
  .reduce((acc, current) => ({ ...acc, ...current }), {});

export const transformObject = (object = {}, fn, filterFn = () => true) => Object.keys(object)
  .filter((field) => filterFn(object, field))
  .map((field) => ({ [field]: fn(object[field]) }))
  .reduce((acc, current) => ({ ...acc, ...current }), {});

export const fileEncoder = (file, readAsText = true) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = resolve;
  if (readAsText) {
    reader.readAsText(file);
    return;
  }
  reader.readAsDataURL(file);
});

export const parseUrlQueryParams = (query, allowed = []) => transformObject(
  query,
  (param) => param,
  (params, key) => allowed.includes(key) && params[key],
);

export const UNMATCHED_GROUP_ID = 'unmatched';
