<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--expand">
      <h2 class="mdl-card__title-text">
        {{ $t('titles.payments') }}
      </h2>
    </div>

    <div class="mdl-card__supporting-text">
      {{ $t('date') }}: {{ filter.date }}
      <br>
      {{ $t('total') }}: {{ payments.length }}
    </div>

    <div class="mdl-card__actions">
      <router-link
        :to="{ name: 'Payments' }"
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--colored"
      >
        <i class="material-icons">payments</i>
      </router-link>
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
};
</script>
