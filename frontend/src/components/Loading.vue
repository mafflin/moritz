<template>
  <v-progress-linear
    class="bar"
    v-if="loading"
    indeterminate
    fixed
  />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Loading',

  computed: {
    ...mapGetters('client', ['loading'])
  }
};
</script>

<style scoped>
  .bar {
    z-index: 10;
  }
</style>
