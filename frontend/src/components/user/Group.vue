<template>
  <v-card>
    <v-card-title>
      <v-icon large left>mdi-cards-club</v-icon>
      <span class="title font-weight-light">{{ selected.name }}</span>
    </v-card-title>

    <v-card-text class="text--primary text-left">{{ selected.id }}</v-card-text>

    <v-card-actions>
      <v-btn @click="handleDeleteGroup" color="error" text>Delete group</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Groups",

  computed: {
    ...mapGetters("groups", ["selected"])
  },

  methods: {
    ...mapActions("groups", ["deleteGroup"]),

    handleDeleteGroup() {
      this.deleteGroup(this.selected.id);
    }
  }
};
</script>

<style scoped>
</style>
