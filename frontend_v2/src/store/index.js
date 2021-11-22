/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

import groups from './groups';
import payments from './payments';
import reports from './reports';
import rules from './rules';
import sessions from './sessions';
import settings from './settings';
import users from './users';

export default createStore({
  modules: {
    groups,
    payments,
    reports,
    rules,
    sessions,
    settings,
    users,
  },
});
