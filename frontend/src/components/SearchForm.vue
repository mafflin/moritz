<template>
  <form
    @submit.prevent
    @keydown.esc="handleReset"
  >
    <i class="material-icons search-icon pr-1">
      search
    </i>

    <div
      class="mdl-textfield mdl-js-textfield"
    >
      <input
        v-model="query"
        autocomplete="off"
        class="mdl-textfield__input"
        type="text"
      >

      <span
        v-if="query"
        class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--white"
        @click="handleReset"
      >
        <i class="material-icons">close</i>
      </span>
    </div>
  </form>
</template>

<script>
import debounce from 'lodash/debounce';
import { INPUT_DEBOUNCE_TIME_MS } from '../utils/globals';

export default {
  props: {
    q: {
      type: String,
      default: null,
    },
  },

  emits: [
    'submit',
  ],

  data() {
    return {
      value: '',
    };
  },

  computed: {
    query: {
      get() {
        return this.q;
      },
      set(value) {
        this.value = value;

        this.handleQueryChange();
      },
    },
  },

  created() {
    this.handleQueryChange = debounce(() => this.handleSubmit(), INPUT_DEBOUNCE_TIME_MS);
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', this.value);
    },

    handleReset() {
      this.value = '';

      this.handleSubmit();
    },
  },
};
</script>

<style scoped>
.search-icon {
  color: rgba(0,0,0,.12);
  vertical-align: middle;
}

.mdl-button--icon {
  right: 0;
}

.mdl-textfield {
  max-width: 200px;
}
</style>
