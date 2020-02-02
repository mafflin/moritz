<template>
  <v-container>
    <v-card>
      <payments-table :payments="payments" />
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import PaymentsTable from '../../components/PaymentsTable.vue';

export default {
  name: 'Payments',

  components: {
    PaymentsTable,
  },

  computed: {
    ...mapGetters('payments', ['payments']),
    ...mapGetters('groups', ['groups']),
  },
};
</script>

<style scoped>
</style>
