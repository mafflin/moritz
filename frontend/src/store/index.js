import Vue from "vue";
import Vuex from "vuex";

import client from "./client";
import groups from "./groups";
import payments from "./payments";
import reports from "./reports";
import rules from "./rules";
import ui from "./ui";
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    client,
    groups,
    payments,
    reports,
    rules,
    ui,
    users
  }
});
