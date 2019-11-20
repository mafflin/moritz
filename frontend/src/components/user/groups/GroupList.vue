<template>
  <div>
    <v-chip
      v-for="group in groups"
      :key="group.id"
      outlined
      class="ma-1"
    >
      {{ group.name }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "GroupList",

  props: {
    groups: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
