<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title mdl-card--expand">
      <h2 class="mdl-card__title-text">
        {{ $t('titles.groups') }}
      </h2>
    </div>
    <div class="mdl-card__supporting-text">
      {{ $t('total') }}: {{ groups.length }}
      <br>
      ?
    </div>
    <button
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
    >
      {{ $t('explore') }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
