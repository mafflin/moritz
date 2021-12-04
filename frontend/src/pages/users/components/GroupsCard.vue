<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">
        {{ $t('titles.groups') }}
      </h2>
    </div>

    <div class="mdl-card__supporting-text mdl-card--expand">
      <group-chip
        v-for="group in groups"
        :key="group.id"
        :group="group"
        :selected-id="selectedId"
        extendable
        selectable
        @select="handleGroupSelect"
        @open-edit-rules="handleOpenEditRules"
      />
    </div>

    <div class="mdl-card__actions">
      <router-link
        :to="{ name: 'AddGroup' }"
        class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
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
    selectedId: {
      type: String,
      default: null,
    },
  },

  emits: [
    'open-edit-rules',
    'select',
  ],

  methods: {
    handleGroupSelect(groupId) {
      this.$emit('select', { groupId });
    },

    handleOpenEditRules(groupId) {
      this.$emit('open-edit-rules', groupId);
    },
  },
};
</script>
