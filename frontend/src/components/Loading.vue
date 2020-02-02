<template>
  <v-progress-linear
    v-if="loading"
    class="bar"
    indeterminate
    fixed
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Loading',

  computed: {
    ...mapGetters('client', ['loading']),
  },
};
</script>

<style scoped>
  .bar {
    z-index: 10;
  }
</style>
