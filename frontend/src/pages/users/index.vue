<template>
  <v-row justify="center">
    <v-expansion-panels popout>
      <user-list-entry
        v-for="user in users"
        :key="user.id"
        :user="user"
      />
    </v-expansion-panels>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import UserListEntry from './components/UserListEntry.vue';

export default {
  name: 'Users',

  components: {
    UserListEntry,
  },

  computed: {
    ...mapGetters('users', ['users']),
  },
};
</script>

<style scoped>
</style>
