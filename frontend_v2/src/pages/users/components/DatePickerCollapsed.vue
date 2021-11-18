<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col">
      <button
        :disabled="loading"
        class="mdl-button mdl-js-button mdl-button--icon"
        @click="handleMonthSubtract"
      >
        <i class="material-icons">chevron_left</i>
      </button>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <button class="mdl-button mdl-js-button mdl-button--accent mdl-button--raised">
        {{ selected?.format('MMM YY') }}
      </button>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <button
        :disabled="loading"
        class="mdl-button mdl-js-button mdl-button--icon"
        @click="handleMonthAdd"
      >
        <i class="material-icons">chevron_right</i>
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { ISO_DATE_FORMAT } from '../../../utils/parseUrlParams';

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'change',
  ],

  data() {
    return {
      selectedDate: null,
    };
  },

  computed: {
    selected: {
      get() {
        return moment(this.date);
      },

      set(value) {
        const date = value.format(ISO_DATE_FORMAT);

        this.$emit('change', { date });
      },
    },
  },

  methods: {
    handleMonthSubtract() {
      this.selected = this.selected
        .subtract(1, 'months');
    },

    handleMonthAdd() {
      this.selected = this.selected
        .add(1, 'months');
    },
  },
};
</script>

<style scoped>
.mdl-grid {
  text-align: center;
}
</style>
