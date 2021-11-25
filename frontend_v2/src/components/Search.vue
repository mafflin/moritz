<template>
  <form @submit.prevent>
    <div
      class="mdl-textfield mdl-js-textfield"
    >
      <input
        v-model="query"
        autocomplete="off"
        class="mdl-textfield__input"
        type="text"
      >

      <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
        disabled
      >
        <i class="material-icons">
          search
        </i>
      </button>
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
  },
};
</script>

<style scoped>
.mdl-button {
  right: 0;
}

.mdl-textfield {
  width: 200px;
}
</style>
