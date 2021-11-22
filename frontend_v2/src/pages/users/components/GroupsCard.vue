<template>
  <div
    :class="{
      'mdl-cell mdl-shadow--2dp': true,
      'mdl-card ': !reduced,
      'mdl-grid': reduced,
    }"
  >
    <div
      v-if="!reduced"
      class="mdl-card__title"
    >
      <h2 class="mdl-card__title-text">
        {{ $t('titles.groups') }}
      </h2>
    </div>

    <div
      :class="{
        'mdl-card__supporting-text mdl-card--expand': !reduced,
        'mdl-cell--10-col': reduced
      }"
    >
      <group-chip
        v-for="group in groups"
        :key="group.id"
        :group="group"
        :selected-id="selectedId"
        :editable="!reduced"
        :deletable="!reduced"
        extendable
        selectable
        @select="handleGroupSelect"
        @open-delete-group="handleOpenDeleteGroup"
        @open-edit-group="handleOpenEditGroup"
        @open-edit-rules="handleOpenEditRules"
      />
    </div>

    <div
      :class="{
        'mdl-card__actions': !reduced,
        'mdl-cell--2-col': reduced
      }"
    >
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
    reduced: {
      type: Boolean,
      default: false,
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
