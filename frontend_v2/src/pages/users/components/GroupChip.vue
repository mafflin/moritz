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
      v-if="extendable && !group.unmatched"
      class="mdl-chip__action"
      @click.stop="$emit('open-edit-rules', group.id)"
    >
      <i :class="{ 'material-icons': true, 'mdl-color-text--white': isSelected }">
        build_circle
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
    'open-edit-rules',
    'select',
  ],

  computed: {
    isSelected() {
      return this.selectedId === this.group.id;
    },

    chipClassName() {
      const {
        isSelected, extendable, selectable, group: { color, unmatched },
      } = this;
      const editable = !unmatched && extendable && 'mdl-chip--deletable';
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
