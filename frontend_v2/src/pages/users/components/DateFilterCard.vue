<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__supporting-text mdl-card--expand">
      <date-picker
        :date="filter.date"
        :loading="loading"
        @change="handleDateChange"
      />
    </div>
  </div>
</template>

<script>
import DatePicker from './DatePicker.vue';

export default {
  components: {
    DatePicker,
  },

  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'submit',
  ],

  methods: {
    handleDateChange(date) {
      this.$emit('submit', { date });
    },
  },
};
</script>
