<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--expand">
      <h2 class="mdl-card__title-text">
        {{ $t('titles.payments') }}
      </h2>
    </div>

    <div class="mdl-card__supporting-text">
      <input
        id="date"
        v-model="date"
        type="date"
        name="date"
        :max="today"
      >
      <br>
      {{ $t('total') }}: {{ payments.length }}
    </div>

    <div class="mdl-card__actions">
      <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--colored"
        @click="handleSubmit"
      >
        <i class="material-icons">chevron_right</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
    filter: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: [
    'submit',
  ],

  data() {
    return { date: null };
  },

  computed: {
    today() {
      const [today] = new Date().toISOString().split('T');
      return today;
    },
  },

  mounted() {
    this.date = this.filter.date || this.today;
  },

  methods: {
    handleSubmit() {
      const { date, $emit } = this;

      $emit('submit', { date });
    },
  },
};
</script>
