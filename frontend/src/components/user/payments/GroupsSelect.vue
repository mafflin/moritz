<template>
  <v-col class="d-flex" cols="12" sm="6">
    <v-select
      class="text-left"
      :items="groups.map(({ id, name }) => ({ value: id, text: name }))"
      :value="selected"
      @input="onSelect"
      label="Group"
      clearable
    />
  </v-col>
</template>

<script>
export default {
  name: "GroupsSelect",

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
