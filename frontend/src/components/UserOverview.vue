<template>
  <v-row v-if="selected" dense>
    <v-col cols="12">
      <user-card :user="selected" :onFileUpload="uploadReport" />
    </v-col>
    <v-col cols="12">
      <groups-card />
    </v-col>
    <v-col cols="12">
      <payments-card />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import GroupsCard from "./GroupsCard";
import PaymentsCard from "./PaymentsCard";
import UserCard from "./users/UserCard";

export default {
  name: "UserOverview",

  components: {
    GroupsCard,
    PaymentsCard,
    UserCard
  },

  computed: {
    ...mapGetters("users", ["selected"])
  },

  methods: {
    ...mapActions("reports", ["uploadReport"])
  }
};
</script>

<style scoped>
</style>
