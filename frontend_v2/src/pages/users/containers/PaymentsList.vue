<template>
  <div class="mdl-grid">
    <payments-table
      :payments="list"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PaymentsTable from '../components/PaymentsTable.vue';

export default {
  components: {
    PaymentsTable,
  },

  computed: {
    ...mapGetters('payments', ['list']),
  },
};
</script>
