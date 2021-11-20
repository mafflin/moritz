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
        editable
        extendable
        deletable
        selectable
        @select="handleGroupSelect"
        @open-delete-group="handleOpenDeleteGroup"
        @open-edit-group="handleOpenEditGroup"
        @open-edit-rules="handleOpenEditRules"
      />
    </div>

    <div class="mdl-card__actions">
      <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mr-1"
        @click="handleGroupSelect(null)"
      >
        <i class="material-icons">clear</i>
      </button>

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
    selectedId: {
      type: String,
      default: null,
    },
  },

  emits: [
    'open-delete-group',
    'open-edit-group',
    'open-edit-rules',
    'select',
  ],

  methods: {
    handleGroupSelect(groupId) {
      this.$emit('select', { groupId });
    },

    handleOpenDeleteGroup(groupId) {
      this.$emit('open-delete-group', groupId);
    },

    handleOpenEditGroup(groupId) {
      this.$emit('open-edit-group', groupId);
    },

    handleOpenEditRules(groupId) {
      this.$emit('open-edit-rules', groupId);
    },
  },
};
</script>
