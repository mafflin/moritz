<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div>
        <v-icon left>mdi-chart-line</v-icon>
        <span>Summary</span>
      </div>

      <div class="text-right">
        <v-chip color="blue-gray lighten-4" class="ma-2">
          <span>
            Payments:
            <strong>{{ total }}</strong>
          </span>
        </v-chip>

        <v-chip color="blue-gray lighten-4" class="ma-2">
          <span>
            Delta:
            <strong>{{ (debit + credit).toFixed() }}</strong>
          </span>
        </v-chip>

        <v-chip color="teal lighten-4" class="ma-2">
          <span>
            Debit:
            <strong>{{ debit.toFixed() }}</strong>
          </span>
        </v-chip>

        <v-chip color="indigo lighten-4" class="ma-2">
          <span>
            Credit:
            <strong>{{ credit.toFixed() }}</strong>
          </span>
        </v-chip>
      </div>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <div class="text-right">
        <group-list :groups="groups" />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from "vuex";
import GroupList from "./groups/GroupList";

export default {
  name: "SummaryPanel",

  components: {
    GroupList
  },

  computed: {
    ...mapGetters("payments", ["total", "debit", "credit"]),
    ...mapGetters("groups", ["groups"])
  }
};
</script>

<style scoped>
</style>
