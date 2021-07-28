<template>
  <v-dialog
    :value="true"
    max-width="600px"
    @input="goToHomePage"
  >
    <v-card>
      <v-card-title>
        <v-icon left>
          mdi-account-cash
        </v-icon>
        <span>Add withdrawal</span>
      </v-card-title>

      <v-card-text class="text-left">
        <withdrawal-add
          :on-submit="updatePayment"
          :payment="selected"
          :loading="loading"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WithdrawalAdd from '../../components/withdrawals/WithdrawalAdd.vue';

export default {
  name: 'Group',

  components: {
    WithdrawalAdd,
  },

  computed: {
    ...mapGetters('payments', ['selected']),
    ...mapGetters('client', ['loading']),
  },

  methods: {
    ...mapActions('router', ['goToHomePage']),
    ...mapActions('payments', ['updatePayment']),
  },
};
</script>

<style scoped>
</style>
