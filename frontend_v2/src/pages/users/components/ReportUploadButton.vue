<template>
  <div>
    <button
      class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--colored"
      :disabled="loading"
      @click="$refs.uploader.click()"
    >
      <i class="material-icons">file_upload</i>
    </button>

    <input
      ref="uploader"
      accept="text/csv"
      class="hidden"
      type="file"
      @change="handleFileSelect"
    >
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'select',
  ],

  methods: {
    handleFileSelect(event) {
      const [file] = event.target.files;
      if (!file) return;

      this.$emit('select', file);
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
