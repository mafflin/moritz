<template>
  <v-card>
    <v-card-text class="text-left">
      <v-row>
        <v-col cols="12">
          <v-chip label color="teal lighten-4">
            <span>
              Debit:
              <strong>{{ debit }}</strong>
            </span>
          </v-chip>

          <v-chip label color="teal lighten-4" class="mx-2">
            <span>
              credit:
              <strong>{{ credit }}</strong>
            </span>
          </v-chip>

          <v-chip label color="teal lighten-4" class="mx-2">
            <span>
              Payments:
              <strong>{{ total }}</strong>
            </span>
          </v-chip>

          <date-picker :date="filter.date" :onChange="handleDateChange" />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="6">
          <groups-select
            :groups="groups" :selected="filter.groupId" :onSelect="handleGroupChange" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DatePicker from "./DatePicker.vue";
import GroupsSelect from "./GroupsSelect.vue";

export default {
  name: "PaymentsSummary",

  components: {
    DatePicker,
    GroupsSelect
  },

  computed: {
    ...mapGetters("payments", ["total", "debit", "credit", "filter"]),
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
.in-chip input {
  color: white !important;
}
</style>
