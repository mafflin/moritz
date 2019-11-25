<template>
  <v-select
    class="text-left"
    :items="groups.map(({ id, name }) => ({ value: id, text: name }))"
    :value="selected"
    @input="onSelect"
    label="Group"
    clearable
  />
</template>

<script>
export default {
  name: "GroupSelect",

  props: {
    groups: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      default: null
    },
    onSelect: {
      type: Function,
      required: true
    }
  }
};
</script>
