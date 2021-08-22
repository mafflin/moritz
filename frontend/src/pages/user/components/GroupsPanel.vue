<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span>
        <v-icon left>mdi-google-circles-extended</v-icon>
        <span>Groups</span>
      </span>

      <group-list
        :groups="groups"
        class="text-right"
      />
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <group-add />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupAdd from './GroupAdd.vue';
import GroupList from './GroupList.vue';

export default {
  components: {
    GroupAdd,
    GroupList,
  },

  computed: {
    ...mapGetters('groups', ['groups']),
  },
};
</script>

<style scoped>
</style>
