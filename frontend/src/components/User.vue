<template>
  <v-row
    dense
    v-if="selected"
  >
    <v-col cols="12">
      <user-card :user="selected" :onFileUpload="uploadReport" />
    </v-col>
    <v-col cols="12">
      <groups />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Groups from "./Groups";
import UserCard from "./users/UserCard";

export default {
  name: "User",

  components: {
    UserCard,
    Groups
  },

  async mounted () {
    const { id } = this.$route.params;

    await this.fetchUser(id);
  },

  computed: {
    ...mapGetters("users", ["selected"])
  },

  methods: {
    ...mapActions("users", ["fetchUser"]),
    ...mapActions("reports", ["uploadReport"]),
  }
};
</script>

<style scoped>
</style>
