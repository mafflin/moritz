export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
export const INPUT_DEBOUNCE_TIME_MS = 350;
export const MESSAGE_TIMEOUT_MS = 5000;

export const SORTABLE_PAYMENT_ATTRIBUTES = [
  { key: 'bookedAt', width: '10%' },
  { key: 'bank', hideOnPhone: true, hideOnTablet: true },
  { key: 'transactionType', hideOnPhone: true },
  { key: 'details', width: '35%' },
  { key: 'beneficiary', hideOnPhone: true, hideOnTablet: true },
  { key: 'note', hideOnPhone: true },
  { key: 'withdrawal', numeric: true, hideOnPhone: true },
  { key: 'debit', numeric: true },
  { key: 'credit', numeric: true },
];

export const parseSortable = (value) => (SORTABLE_PAYMENT_ATTRIBUTES
  .map(({ key }) => key)
  .includes(value) ? value : null);
