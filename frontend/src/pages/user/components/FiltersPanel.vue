<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span>
        <v-icon left>mdi-filter-variant</v-icon>
        <span>Filters</span>
      </span>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row>
        <v-col cols="12" sm="6">
          <date-picker :date="filter.date" :onChange="handleDateChange" />
        </v-col>
        <v-col cols="12" sm="6">
          <group-select :groups="groups" :selected="filter.groupId" :onSelect="handleGroupChange" />
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
