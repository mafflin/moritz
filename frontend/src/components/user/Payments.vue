<template>
  <v-row justify="center">
    <v-col cols="12">
      <payments-summary />
    </v-col>

    <v-col cols="12">
      <payments-table :payments="payments" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PaymentsTable from "./payments/PaymentsTable";
import PaymentsSummary from "./payments/PaymentsSummary";

export default {
  name: "Payments",

  components: {
    PaymentsTable,
    PaymentsSummary,
  },

  mounted() {
    this.fetchPayments();
  },

  computed: {
    ...mapGetters("payments", ["payments"])
  },

  methods: {
    ...mapActions("payments", ["fetchPayments"])
  }
};
</script>

<style scoped>
</style>
