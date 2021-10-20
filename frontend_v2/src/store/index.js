import { createStore } from 'vuex';

import sessions from './sessions';
import users from './users';

export default createStore({
  modules: {
    sessions,
    users,
  },
});
