<template>
  <div class="mdl-grid">
    <payments-card
      :payments="payments"
      :filter="paymentsFilter"
    />

    <groups-card
      :groups="groups"
    />

    <uploads-card />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupsCard from '../components/GroupsCard.vue';
import PaymentsCard from '../components/PaymentsCard.vue';
import UploadsCard from '../components/UploadsCard.vue';

export default {
  components: {
    GroupsCard,
    PaymentsCard,
    UploadsCard,
  },

  computed: {
    ...mapGetters('users', ['current']),
    ...mapGetters('payments', {
      payments: 'list',
      paymentsFilter: 'filter',
    }),
    ...mapGetters('groups', {
      groups: 'list',
    }),
    ...mapGetters('rules', {
      rules: 'list',
    }),
  },
};
</script>

<style lang="css" scoped>
</style>
