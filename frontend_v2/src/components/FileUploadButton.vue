<template>
  <div>
    <img
      v-if="image"
      class="mdl-chip__contact clickable ml-2"
      :src="image"
      @click="handleClick"
    >

    <button
      v-else
      :class="{
        'mdl-button mdl-js-button': true,
        'mdl-button--fab mdl-button--colored': colored,
        'mdl-button--icon': small,
      }"
      :disabled="loading"
      @click="handleClick"
    >
      <i
        :class="{
          'material-icons': true,
          'small-button': small,
        }"
      >
        {{ icon }}
      </i>
    </button>

    <input
      ref="uploader"
      :accept="accept"
      class="hidden"
      type="file"
      @change="handleFileSelect"
    >
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    colored: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'select',
  ],

  computed: {
    accepts() {
      return this.allowedFileTypes.join(',');
    },
  },

  methods: {
    handleFileSelect(event) {
      const [file] = event.target.files;
      if (!file) return;

      this.$emit('select', file);
    },

    handleClick() {
      this.$refs.uploader.click();
    },
  },
};
</script>

<style lang="css" scoped>
.small-button {
  font-size: 18px;
}
</style>
