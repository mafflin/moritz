/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

import groups from './groups';
import payments from './payments';
import reports from './reports';
import rules from './rules';
import search from './search';
import sessions from './sessions';
import settings from './settings';
import users from './users';

export default createStore({
  modules: {
    groups,
    payments,
    reports,
    rules,
    search,
    sessions,
    settings,
    users,
  },

  getters: {
    loading(state, getters) {
      return getters['groups/loading']
        || getters['payments/loading']
        || getters['reports/loading']
        || getters['rules/loading']
        || getters['search/loading']
        || getters['sessions/loading']
        || getters['settings/loading']
        || getters['users/loading'];
    },
  },
});
