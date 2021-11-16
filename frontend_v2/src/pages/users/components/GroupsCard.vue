<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">
        {{ $t('titles.groups') }}
      </h2>
    </div>

    <div class="mdl-card__supporting-text">
      <group-chip
        v-for="group in groups"
        :key="group.id"
        :group="group"
        editable
      />
    </div>

    <div class="mdl-card__actions">
      <router-link
        :to="{ name: 'AddGroup' }"
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--colored"
      >
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import GroupChip from './GroupChip.vue';

export default {
  components: {
    GroupChip,
  },

  props: {
    groups: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="css" scoped>
.mdl-card__actions {
  text-align: end;
}
</style>
