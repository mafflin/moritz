<template>
  <div
    :class="{
      'mdl-cell mdl-shadow--2dp': true,
      'mdl-card': !reduced,
    }"
  >
    <div
      v-if="!reduced"
      class="mdl-card__supporting-text mdl-card--expand"
    >
      <date-picker
        :date="filter.date"
        :loading="loading"
        @change="handleDateChange"
      />
    </div>

    <date-picker-reduced
      v-else
      :date="filter.date"
      @change="handleDateChange"
    />
  </div>
</template>

<script>
import DatePicker from './DatePicker.vue';
import DatePickerReduced from './DatePickerReduced.vue';

export default {
  components: {
    DatePicker,
    DatePickerReduced,
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
    reduced: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'submit',
  ],

  methods: {
    handleDateChange({ date }) {
      this.$emit('submit', { date });
    },
  },
};
</script>
