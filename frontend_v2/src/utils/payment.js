const SORTABLE_ATTRIBUTES = [
  'bookedAt',
  'bank',
  'transactionType',
  'details',
  'beneficiary',
  'note',
  'withdrawal',
  'debit',
  'credit',
];

const NUMERIC_ATTRIBUTES = [
  { key: 'debit', color: 'mdl-color-text--green' },
  { key: 'credit', color: 'mdl-color-text--indigo' },
  { key: 'delta', color: 'mdl-color-text--blue-grey' },
  { key: 'withdrawal', color: 'mdl-color-text--pink' },
];

export default {
  numericAttributes: NUMERIC_ATTRIBUTES,
  sortableAttributes: SORTABLE_ATTRIBUTES,
  parseSortable: (value) => (SORTABLE_ATTRIBUTES.includes(value) ? value : null),
};
