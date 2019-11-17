import Vue from "vue";
import Vuex from "vuex";

import client from "./client";
import groups from "./groups";
import reports from "./reports";
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    client,
    groups,
    reports,
    users
  }
});
