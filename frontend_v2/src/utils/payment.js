const sortable = [
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

export default {
  sortable,
  parseSortable: (value) => (sortable.includes(value) ? value : null),
};
