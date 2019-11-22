<template>
  <v-row dense>
    <v-col cols="12" md="4">
      <groups-card />
    </v-col>

    <v-col cols="12" md="4">
      <payments-card />
    </v-col>

    <v-col cols="12" md="4">
      <reports-card :loading="loading" :onSubmit="uploadReport" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import GroupsCard from "./GroupsCard";
import PaymentsCard from "./PaymentsCard";
import ReportsCard from "./ReportsCard";

export default {
  name: "UserOverview",

  components: {
    GroupsCard,
    PaymentsCard,
    ReportsCard
  },

  computed: {
    ...mapGetters("users", ["selected"]),
    ...mapGetters("client", ["loading"])
  },

  methods: {
    ...mapActions("reports", ["uploadReport"])
  }
};
</script>

<style scoped>
</style>
