const globals = {
  add: 'Add',
  appSubitle: 'The Calculator',
  cancel: 'Cancel',
  close: 'Close',
  create: 'Create',
  date: 'Date',
  delete: 'Delete',
  edit: 'Edit',
  explore: 'Explore',
  logout: 'Logout',
  new: 'New',
  search: 'Search',
  signup: 'Sign up',
  success: 'Success!',
  submit: 'Submit',
  total: 'Total',
  upload: 'Upload',
};

const groups = {
  addNew: 'New Group',
  deleteHint: 'Delete?',
  edit: 'Edit Group',
  enterName: 'Name',
  unmatched: 'Unmatched',
};

const imports = {
  createdAt: 'Started',
  failed: 'Import has failed :(',
  finished: 'Import finished! Total: {paymentsTotal}. Created: {paymentsCreated}',
  history: 'Last {importHistorySize} imports',
  paymentsTotal: 'Total',
  paymentsCreated: 'New',
  started: 'Import started!',
  status: 'Status',
  updatedAt: 'Finished',
};

const payments = {
  actions: 'Actions',
  bank: 'Bank',
  beneficiary: 'Beneficiary',
  bookedAt: 'Date',
  credit: 'Credit',
  debit: 'Debit',
  delta: 'Delta',
  details: 'Details',
  noPayments: 'No payments found. Try to adjust filters.',
  note: 'Note',
  searchResults: '{total} payments found',
  transactionType: 'Type',
  withdrawal: 'Cash',
};

const rules = {
  add: 'Add rule',
  manage: 'Manage Rules',
  match: 'Match',
};

const titles = {
  app: 'Moritz',
  filter: 'Filter',
  groups: 'Groups',
  payments: 'Payments',
  rules: 'Rules',
  uploads: 'Uploads',
  users: 'Users',
};

const users = {
  name: 'User name',
  updateSuccess: 'User updated!',
};

export default {
  ...globals,

  groups,
  payments,
  imports,
  rules,
  titles,
  users,
};