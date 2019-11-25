<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div>
        <v-icon left>mdi-chart-line</v-icon>
        <span>Summary</span>
      </div>

      <div class="text-right">
        <v-chip label color="teal lighten-4" class="mx-2">
          <span>
            Debit:
            <strong>{{ debit }}</strong>
          </span>
        </v-chip>

        <v-chip label color="teal lighten-4" class="mx-2">
          <span>
            Credit:
            <strong>{{ credit }}</strong>
          </span>
        </v-chip>

        <v-chip label color="teal lighten-4" class="mx-2">
          <span>
            Payments:
            <strong>{{ total }}</strong>
          </span>
        </v-chip>
      </div>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      No content yet!
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "SummaryPanel",

  computed: {
    ...mapGetters("payments", ["total", "debit", "credit"])
  },
};
</script>

<style scoped>
</style>
