<template>
  <v-card>
    <v-data-table :headers="headers" :items="payments" :items-per-page="-1" item-key="id" />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Payments",

  data() {
    return {
      headers: [
        { text: "Booked At", align: "left", value: "bookedAt", width: "15%" },
        { text: "Transaction Type", value: "transactionType" },
        { text: "Details", value: "details" },
        { text: "Beneficiary", value: "beneficiary" },
        { text: "Customer Reference", value: "customerReference" },
        { text: "Debit", value: "debit" },
        { text: "Credit", value: "credit" }
      ]
    };
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
