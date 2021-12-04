<template>
  <div class="mdl-grid">
    <router-view />

    <user-card
      v-for="(user, index) in list"
      :key="index"
      :user="user"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserCard from './components/UserCard.vue';

export default {
  components: {
    UserCard,
  },

  computed: {
    ...mapGetters('users', ['list', 'loading']),
  },
};
</script>
