<template>
  <v-card-title>
    Filters:
    <v-spacer />
    <date-picker :date="filter.date" :onChange="handleDateChange" class="ml-4" />
    <group-select
      :groups="groups"
      :selected="filter.groupId"
      :onSelect="handleGroupChange"
      class="ml-4"
    />
  </v-card-title>
</template>

<script>
import DatePicker from "./filters/DatePicker.vue";
import GroupSelect from "./filters/GroupSelect.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FiltersPanel",

  components: {
    DatePicker,
    GroupSelect
  },

  computed: {
    ...mapGetters("payments", ["filter"]),
    ...mapGetters("groups", ["groups"])
  },

  methods: {
    ...mapActions("payments", ["updateFilter"]),

    handleDateChange(date) {
      this.updateFilter({ date });
    },

    handleGroupChange(groupId) {
      this.updateFilter({ groupId });
    }
  }
};
</script>

<style scoped>
</style>
