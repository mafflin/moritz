import moment from 'moment';
import { ISO_DATE_FORMAT } from './globals';

export const parseBoolean = (value) => value === 'true';

export const parseString = (value) => (value ? String(value) : null);

export const parseDate = (value) => {
  const date = moment(value, ISO_DATE_FORMAT, true);
  return date.isValid() ? date.format(ISO_DATE_FORMAT) : null;
};

export default (query, params = {}) => {
  const parsed = Object.entries(params)
    .map(([param, parseFn]) => ({ [param]: parseFn(query[param]) || null }))
    .reduce((acc, current) => ({ ...acc, ...current }), {});
  return parsed;
};
