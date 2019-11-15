<template>
  <v-row justify="center">
    <v-expansion-panels popout>
      <user-list-entry
        v-for="user in users"
        :user="user"
        :key="user.id"
      />
    </v-expansion-panels>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserListEntry from './users/UserListEntry.vue';

export default {
  name: 'Users',

  components: {
    UserListEntry,
  },

  mounted () {
    this.fetchUsers();
  },

  computed: {
    ...mapGetters('users', ['users']),
  },

  methods: {
    ...mapActions('users', ['fetchUsers']),
  },
};
</script>

<style scoped>
</style>
