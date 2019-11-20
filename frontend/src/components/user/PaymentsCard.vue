<template>
  <v-card>
    <v-card-title>
      <v-icon large left>mdi-currency-eur</v-icon>
      <span class="title font-weight-light">Payments</span>
    </v-card-title>

    <v-card-text class="text--primary text-left">Payments</v-card-text>

    <v-card-actions>
      <v-btn :to="{ name: 'Payments' }" color="teal" text>Payments</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PaymentsCard"
};
</script>

<style scoped>
</style>
