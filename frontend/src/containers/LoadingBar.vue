<template>
  <div class="loader-wrapper">
    <div
      v-show="loading"
      class="mdl-progress mdl-js-progress mdl-progress__indeterminate"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['loading']),
  },
};
</script>

<style lang="css" scoped>
.loader-wrapper {
  position: fixed;
  height: 5px;
  width: 100%;
  z-index: 101;
}

.mdl-progress {
  width: 100%;
}
</style>
