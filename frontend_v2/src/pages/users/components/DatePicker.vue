<template>
  <div class="date-picker">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--4-col">
        <button
          :disabled="loading"
          class="mdl-button mdl-js-button mdl-button--icon"
          @click="handleYearSubtract"
        >
          <i class="material-icons">chevron_left</i>
        </button>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <button
          disabled
          class="mdl-button mdl-js-button mdl-color-text--black"
        >
          {{ selected?.format('YYYY') }}
        </button>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <button
          :disabled="loading"
          class="mdl-button mdl-js-button mdl-button--icon"
          @click="handleYearAdd"
        >
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    </div>

    <div
      class="mdl-grid"
    >
      <div
        v-for="_month in months"
        :key="_month"
        class="mdl-cell mdl-cell--4-col"
      >
        <button
          :class="{
            'mdl-button mdl-js-button': true,
            'mdl-button--accent mdl-button--raised': _month === selected?.format('MMM')
          }"
          @click="handleMonthChange(_month)"
        >
          {{ _month }}
        </button>
      </div>
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

    months() {
      return moment.months()
        .map((month) => moment().month(month).format('MMM'));
    },
  },

  methods: {
    handleMonthChange(value) {
      const year = this.selected.year();
      const month = moment().month(value).format('MM');
      const day = '01';

      this.selected = moment([year, month, day].join('-'));
    },

    handleYearSubtract() {
      this.selected = this.selected
        .subtract(1, 'years');
    },

    handleYearAdd() {
      this.selected = this.selected
        .add(1, 'years');
    },
  },
};
</script>

<style scoped>
.date-picker {
  text-align: center;
}

.mdl-grid {
  padding: 0;
}
</style>
