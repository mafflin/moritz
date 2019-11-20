<template>
  <v-card>
    <v-card-text class="text-left">
      <v-chip label color="teal lighten-4" class="mx-2">
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

      <v-menu v-model="menu" :close-on-content-click="true" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-chip label color="white" class="mx-2">
            <v-text-field color="teal lighten-4" v-model="date" v-on="on" readonly />
          </v-chip>
        </template>
        <v-date-picker v-model="date" @input="handleDateChange" color="teal" />
      </v-menu>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PaymentsSummary",

  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      menu: false
    };
  },

  computed: {
    ...mapGetters("payments", ["total", "debit", "credit"])
  },

  methods: {
    ...mapActions("payments", ["fetchPayments"]),

    handleDateChange() {
      this.menu = false;
      this.fetchPayments({ date: this.date });
    }
  }
};
</script>

<style scoped>
.in-chip input {
  color: white !important;
}
</style>
