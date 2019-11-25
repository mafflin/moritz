<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span>
        <v-icon left>mdi-google-circles-extended</v-icon>
        <span>Groups</span>
      </span>

      <group-list :groups="groups" />
    </v-expansion-panel-header>

    <v-expansion-panel-content>Lorem ipsum dolor sit amet!</v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupList from "./groups/GroupList.vue";

export default {
  name: "GroupsPanel",

  components: {
    GroupList
  },

  computed: {
    ...mapGetters("groups", ["groups"])
  },
};
</script>

<style scoped>
</style>
