<template>
  <v-combobox
    class="text-left"
    :items="groups.map(({ id, name }) => ({ value: id, text: name }))"
    @input="onSelect"
    label="Group"
    small-chips
    clearable
  />
</template>

<script>
export default {
  name: "GroupsSelect",

  props: {
    groups: {
      type: Array,
      required: true
    },
    onSelect: {
      type: Function,
      required: true
    }
  },
};
</script>
