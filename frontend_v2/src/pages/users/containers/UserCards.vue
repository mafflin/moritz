<template>
  <div class="mdl-grid">
    <uploads-card />

    <groups-card
      :groups="groups"
    />

    <payments-card
      :payments="payments"
      :filter="paymentsFilter"
      @submit="filterList"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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

  methods: {
    ...mapActions('payments', ['filterList']),
  },
};
</script>
