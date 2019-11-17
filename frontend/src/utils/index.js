export const convertArrayToObject = (array, key = "id") =>
  array
    .map(item => ({ [item[key]]: item }))
    .reduce((acc, current) => ({ ...acc, ...current }), {});

export const fileEncoder = file =>
  new Promise(resolve => {
    let reader = new FileReader();
    reader.onload = resolve;
    reader.readAsText(file);
  });
