<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <user-card :user="selected" />
      </v-col>
    </v-row>

    <router-view></router-view>
  </v-container>
</template>

<script>
import UserCard from "./user/UserCard";
import { mapGetters } from "vuex";

export default {
  name: "User",

  components: { UserCard },

  computed: {
    ...mapGetters("users", ["selected"])
  }
};
</script>

<style scoped>
</style>
