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
  height: 5px;
  width: 100%;
}

.mdl-progress {
  width: 100%;
}
</style>
