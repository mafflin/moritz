<template>
  <span
    :class="chipClassName"
  >
    <span class="mdl-chip__text">{{ group.name }}</span>

    <router-link
      v-if="editable"
      :to="{ name: 'EditGroup', params: { groupId: group.id } }"
      class="mdl-chip__action"
    >
      <i class="material-icons mdl-color-text--white">edit</i>
    </router-link>

    <router-link
      v-if="editable"
      :to="{ name: 'DeleteGroup', params: { groupId: group.id } }"
      class="mdl-chip__action"
    >
      <i class="material-icons mdl-color-text--white">cancel</i>
    </router-link>
  </span>
</template>

<script>

export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    chipClassName() {
      const { editable, group: { color } } = this;
      const deletable = editable && 'mdl-chip--deletable';
      const colored = color && `mdl-color--${color} mdl-color-text--white`;
      return [
        'mdl-chip',
        deletable,
        colored,
      ].filter((item) => !!item);
    },
  },
};
</script>

<style lang="css" scoped>
.mdl-chip {
  margin-right: 4px;
}
</style>
