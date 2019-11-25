<template>
  <div class="text-right">
    <v-chip v-if="filter.date" color="teal" text-color="white" class="ma-1">
      <v-icon left>mdi-calendar</v-icon>
      {{ filter.date }}
    </v-chip>

    <v-chip v-if="selectedGroup" color="teal" text-color="white" class="ma-1">
      <v-icon left>mdi-google-circles-extended</v-icon>
      {{ selectedGroup.name }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "ActiveFilters",

  props: {
    filter: {
      type: Object,
      required: true
    },
    groups: {
      type: Array,
      required: true
    }
  },

  computed: {
    selectedGroup() {
      const {
        groups,
        filter: { groupId }
      } = this;
      return groups.find(group => group.id === groupId);
    }
  }
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: teal;
  text-decoration: none;
}
</style>
