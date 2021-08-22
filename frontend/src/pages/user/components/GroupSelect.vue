<template>
  <v-select
    class="text-left"
    :items="items"
    :value="selected"
    label="Group"
    clearable
    @input="onSelect"
  />
</template>

<script>
import { UNMATCHED_GROUP_ID } from '../../../utils';

export default {
  props: {
    groups: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      default: null,
    },
    onSelect: {
      type: Function,
      required: true,
    },
  },

  computed: {
    items() {
      const groups = this.groups.map(({ id, name }) => ({
        value: id,
        text: name,
      }));
      const unmatched = { value: UNMATCHED_GROUP_ID, text: 'Unmatched' };
      return [...groups, unmatched];
    },
  },
};
</script>
