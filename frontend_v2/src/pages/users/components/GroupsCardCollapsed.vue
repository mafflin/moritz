<template>
  <div class="mdl-grid">
    <div class="mdl-cell--10-col">
      <group-chip
        v-for="group in groups"
        :key="group.id"
        :group="group"
        :selected-id="selectedId"
        selectable
        @select="handleGroupSelect"
        @open-delete-group="handleOpenDeleteGroup"
        @open-edit-group="handleOpenEditGroup"
        @open-edit-rules="handleOpenEditRules"
      />
    </div>

    <div class="mdl-cell--2-col">
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
