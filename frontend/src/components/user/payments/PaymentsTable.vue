<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="payments"
      :items-per-page="-1"
      item-key="id"
      class="elevation-1"
    />
  </v-card>
</template>

<script>
export default {
  name: "PaymentsTable",

  components: {},

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

  props: {
    payments: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
