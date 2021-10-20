<template>
  <div>
    <user-navigation />

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import UserNavigation from './components/UserNavigation.vue';

export default defineComponent({
  components: {
    UserNavigation,
  },

  computed: {
    ...mapGetters('users', ['current', 'loading']),
  },
});
</script>
