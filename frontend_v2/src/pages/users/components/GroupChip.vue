<template>
  <span
    :class="chipClassName"
    @click="handleSelect"
  >
    <span
      class="mdl-chip__text"
    >
      {{ group.name }}
    </span>

    <span
      v-if="group.unmatched"
      class="mdl-chip__action pr-1"
    >
      <i :class="{ 'material-icons': true, 'mdl-color-text--white': isSelected }">
        format_underlined
      </i>
    </span>

    <span
      v-for="{ icon, action } in actions"
      :key="action"
      class="mdl-chip__action"
      @click.stop="$emit(action, group.id)"
    >
      <i :class="{ 'material-icons': true, 'mdl-color-text--white': isSelected }">
        {{ icon }}
      </i>
    </span>
  </span>
</template>

<script>

export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
    selectedId: {
      type: String,
      default: null,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    extendable: {
      type: Boolean,
      default: false,
    },
    selectable: {
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

  computed: {
    isSelected() {
      return this.selectedId === this.group.id;
    },

    actions() {
      const {
        group, editable, deletable, extendable,
      } = this;
      if (group.unmatched) return [];

      return [
        { icon: 'edit', action: 'open-edit-group', active: editable },
        { icon: 'control_point_duplicate', action: 'open-edit-rules', active: extendable },
        { icon: 'cancel', action: 'open-delete-group', active: deletable },
      ].filter(({ active }) => !!active);
    },

    chipClassName() {
      const {
        actions, isSelected, selectable, group: { color },
      } = this;
      const editable = actions.length && 'mdl-chip--deletable';
      const clickable = selectable && 'clickable';
      const selected = isSelected && 'selected mdl-shadow--6dp';
      const colored = (isSelected || !selectable)
        && color
        && `mdl-color--${color} mdl-color-text--white`;
      return [
        'mdl-chip',
        'mr-1',
        selected,
        editable,
        colored,
        clickable,
      ].filter((item) => !!item);
    },
  },

  methods: {
    handleSelect() {
      const {
        isSelected, selectable, group, $emit,
      } = this;
      if (!selectable) return;

      $emit('select', isSelected ? null : group.id);
    },
  },
};
</script>

<style scoped>
.selected {
  font-weight: bold;
}
</style>
