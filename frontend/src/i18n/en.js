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
  login: 'Login',
  logout: 'Logout',
  new: 'New',
  notFound: 'Not found!',
  search: 'Search',
  signup: 'Create account',
  signin: 'Sign in',
  success: 'Success!',
  submit: 'Submit',
  total: 'Total',
  upload: 'Upload',
  unauthorized: 'Access denied!',
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
  createdAt: 'Created at',
  credit: 'Credit',
  currency: 'Currency',
  customerReference: 'Customer reference',
  debit: 'Debit',
  delta: 'Delta',
  details: 'Details',
  externalCreditorId: 'External creditor ID',
  id: 'ID',
  mandateReference: 'Mandate reference',
  noPayments: 'No payments found. Try to adjust filters.',
  note: 'Note',
  searchResults: '{total} payments found',
  transactionType: 'Type',
  updatedAt: 'Updated at',
  withdrawal: 'Cash',
};

const rules = {
  add: 'Add rule',
  manage: 'Manage Rules',
  match: 'Match',
  showHidden: 'Click here to show {total} hidden rules.',
};

const titles = {
  app: 'Moritz',
  filter: 'Filter',
  groups: 'Groups',
  imports: 'Imports',
  payments: 'Payments',
  rules: 'Rules',
  summary: 'Summary',
  uploads: 'Uploads',
  users: 'Users',
};

const users = {
  name: 'User name',
  password: 'Password',
  passwordConfirmation: 'Confirm password',
  passwordsDoNotMatch: 'Passwords do not match!',
  updateSuccess: 'User updated!',
};

export default {
  ...globals,

  groups,
  imports,
  payments,
  rules,
  titles,
  users,
};
