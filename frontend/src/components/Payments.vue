<template>
  <v-row v-if="payments.length > 0" justify="center">
    <v-data-table :headers="headers" :items="payments" item-key="id" class="elevation-1" />
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Payments",

  components: {},

  data() {
    return {
      headers: [
        { text: "Booked At", align: "left", value: "bookedAt" },
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
