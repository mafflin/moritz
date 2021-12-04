export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
export const INPUT_DEBOUNCE_TIME_MS = 350;
export const MESSAGE_TIMEOUT_MS = 5000;

export const SORTABLE_PAYMENT_ATTRIBUTES = [
  { key: 'bookedAt', width: '8%' },
  { key: 'bank' },
  { key: 'transactionType' },
  { key: 'details', width: '35%' },
  { key: 'beneficiary' },
  { key: 'note' },
  { key: 'withdrawal', numeric: true },
  { key: 'debit', numeric: true },
  { key: 'credit', numeric: true },
];

export const parseSortable = (value) => (SORTABLE_PAYMENT_ATTRIBUTES
  .map(({ key }) => key)
  .includes(value) ? value : null);
