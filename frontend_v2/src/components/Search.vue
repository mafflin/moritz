<template>
  <form @submit.prevent>
    <div>
      <i class="search-icon material-icons pr-1">
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
      </div>
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
.search-icon {
  font-size: 25px;
  vertical-align: middle;
  border-bottom: 1px solid white;
}

.mdl-textfield {
  width: 120px;
}

.mdl-textfield__input {
  border-bottom: 1px solid white;
}
</style>
