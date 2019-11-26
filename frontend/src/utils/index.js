export const convertArrayToObject = (array, key = 'id') =>
  array.map(item => ({ [item[key]]: item })).reduce((acc, current) => ({ ...acc, ...current }), {})

export const transformObject = (object = {}, fn, filterFn = () => true) =>
  Object.keys(object)
    .filter(field => filterFn(object, field))
    .map(field => ({ [field]: fn(object[field]) }))
    .reduce((acc, current) => ({ ...acc, ...current }), {})

export const fileEncoder = file =>
  new Promise(resolve => {
    let reader = new FileReader()
    reader.onload = resolve
    reader.readAsText(file)
  })

export const UNMATCHED_GROUP_ID = 'unmatched'
