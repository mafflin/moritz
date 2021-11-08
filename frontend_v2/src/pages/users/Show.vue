<template>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},

  computed: {
    ...mapGetters('users', ['loading']),
  },
};
</script>
