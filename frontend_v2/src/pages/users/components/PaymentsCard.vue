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
    <router-link
      :to="{ name: 'Payments' }"
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
    >
      <span>{{ $t('explore') }}</span>
    </router-link>
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

<style lang="css" scoped>
</style>
