<template>
  <div>
    <router-view name="modals" />
    <router-view />
  </div>
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
