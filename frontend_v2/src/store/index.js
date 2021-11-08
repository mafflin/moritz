/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

import groups from './groups';
import payments from './payments';
import rules from './rules';
import sessions from './sessions';
import users from './users';

export default createStore({
  modules: {
    groups,
    payments,
    rules,
    sessions,
    users,
  },
});
