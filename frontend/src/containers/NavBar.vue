<template>
  <header class="mdl-layout__header">
    <i class="mdl-layout-icon material-icons">pets</i>

    <div class="mdl-layout__header-row">
      <span class="mdl-layout__title">
        {{ $t('titles.app') }}
      </span>

      <div class="mdl-layout-spacer" />

      <router-view name="navigation" />
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.mdl-layout-icon {
  font-size: 32px;
}
</style>
