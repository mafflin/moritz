<template>
  <v-data-table
    :headers="headers"
    :items="payments"
    :items-per-page="-1"
    item-key="id"
    must-sort
   >
    <template v-slot:item.debit="{ item }">
      <v-chip color="teal lighten-4">{{ item.debit.toFixed(2) }}</v-chip>
    </template>
    <template v-slot:item.credit="{ item }">
      <v-chip color="indigo lighten-4">{{ item.credit.toFixed(2) }}</v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Payments",

  data() {
    return {
      headers: [
        { text: "Booked at", align: "left", value: "bookedAt", width: "15%" },
        { text: "Type", value: "transactionType" },
        { text: "Details", value: "details" },
        { text: "Beneficiary", value: "beneficiary" },
        { text: "Debit", value: "debit", width: "10%" },
        { text: "Credit", value: "credit", width: "10%" }
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
