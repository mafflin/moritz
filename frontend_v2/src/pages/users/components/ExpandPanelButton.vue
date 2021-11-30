<template>
  <div class="mdl-grid collapse-button my-0 py-0">
    <div
      class="mdl-cell mdl-cell--12-col clickable my-0 py-0"
      @click="$emit('toggle')"
    >
      <i
        v-if="panelExpanded"
        class="material-icons"
      >
        expand_less
      </i>
      <i
        v-else
        class="material-icons"
      >
        expand_more
      </i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    panelExpanded: {
      type: Boolean,
      required: true,
    },
  },

  emits: [
    'toggle',
  ],
};
</script>

<style scoped>
.collapse-button {
  text-align: center;
}
</style>
