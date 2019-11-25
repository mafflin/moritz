<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <user-card :user="selected" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-expansion-panels accordion>
            <upload-panel />
            <summary-panel />
            <groups-panel />
            <filters-panel />
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <payments-table />
      </v-col>
    </v-row>

    <router-view />
  </v-container>
</template>

<script>
import FiltersPanel from "./components/FiltersPanel.vue";
import GroupsPanel from "./components/GroupsPanel.vue";
import PaymentsTable from "./components/PaymentsTable.vue";
import SummaryPanel from "./components/SummaryPanel.vue";
import UploadPanel from "./components/UploadPanel.vue";
import UserCard from "./components/UserCard.vue";

import { mapGetters } from "vuex";

export default {
  name: "User",

  components: {
    FiltersPanel,
    GroupsPanel,
    PaymentsTable,
    SummaryPanel,
    UploadPanel,
    UserCard,
  },

  computed: {
    ...mapGetters("users", ["selected"]),
  }
};
</script>

<style scoped>
</style>
