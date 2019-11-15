<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-cards
      </v-icon>
      <span class="title font-weight-light">Groups</span>
    </v-card-title>

    <v-card-text class="text--primary text-left">
      <group-list :groups="groups" />
      <group-add :on-submit="handleCreateGroup" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GroupList from './groups/GroupList.vue';
import GroupAdd from './groups/GroupAdd.vue';

export default {
  name: 'Groups',

  components: {
    GroupList,
    GroupAdd,
  },

  mounted() {
    this.fetchGroups()
  },

  computed: {
    ...mapGetters('groups', ['groups']),
  },

  methods: {
    ...mapActions('groups', ['fetchGroups','createGroup']),

    handleCreateGroup (name) {
      this.createGroup({ name });
    },
  },
};
</script>

<style scoped>
</style>
