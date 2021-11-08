<template>
  <div class="mdl-grid">
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
    ...mapGetters('users', ['list', 'isLoading']),
  },
};
</script>

<style scoped>
</style>
