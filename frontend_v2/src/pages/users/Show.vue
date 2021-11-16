<template>
  <div>
    <router-view />

    <user-cards />
    <payments-list />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PaymentsList from './containers/PaymentsList.vue';
import UserCards from './containers/UserCards.vue';

export default {
  components: {
    UserCards,
    PaymentsList,
  },

  computed: {
    ...mapGetters('users', ['loading']),
  },
};
</script>
