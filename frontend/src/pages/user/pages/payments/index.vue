<template>
  <v-container>
    <v-card>
      <payments-table :payments="payments" />
    </v-card>
  </v-container>
</template>

<script>
import PaymentsTable from "../../components/PaymentsTable.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Payments",

  components: {
    PaymentsTable
  },

  mounted() {
    this.fetchPayments();
  },

  computed: {
    ...mapGetters("payments", ["payments"]),
    ...mapGetters("groups", ["groups"])
  },

  methods: {
    ...mapActions("payments", ["fetchPayments"])
  }
};
</script>

<style scoped>
</style>
