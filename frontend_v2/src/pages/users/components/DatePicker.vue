<template>
  <div class="date-picker">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--4-col">
        <button
          :disabled="loading"
          class="mdl-button mdl-js-button mdl-button--icon"
          @click="handleYearChange(year-1)"
        >
          <i class="material-icons">chevron_left</i>
        </button>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <button
          disabled
          class="mdl-button mdl-js-button mdl-color-text--black"
        >
          {{ year }}
        </button>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <button
          :disabled="loading"
          class="mdl-button mdl-js-button mdl-button--icon"
          @click="handleYearChange(year+1)"
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
            'mdl-button--accent mdl-button--raised':_month === month
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
      year: null,
      month: null,
    };
  },

  computed: {
    months() {
      return moment.months()
        .map((month) => moment().month(month).format('MMM'));
    },
  },

  mounted() {
    const selected = moment(this.date);

    this.year = parseInt(selected.format('YYYY'), 10);
    this.month = selected.format('MMM');
  },

  methods: {
    handleMonthChange(value) {
      this.month = value;
      this.handleDateChange();
    },

    handleYearChange(value) {
      this.year = value;
      this.handleDateChange();
    },

    handleDateChange() {
      const { year, month } = this;
      const date = moment([year, month].join(), 'YYYYMMM')
        .format('YYYY-MM-DD');

      this.$emit('change', date);
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
