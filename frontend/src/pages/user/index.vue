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
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <payments-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsTable from "./components/PaymentsTable.vue";
import SummaryPanel from "./components/SummaryPanel.vue";
import UploadPanel from "./components/UploadPanel.vue";
import UserCard from "./components/UserCard.vue";

import { mapGetters } from "vuex";

export default {
  name: "User",

  components: {
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
