<template>
  <div class="mdl-grid">
    <payments-table
      v-if="list.length"
      class="mdl-cell mdl-cell--12-col"
      :payments="list"
    />

    <div
      v-else
      class="mdl-card mdl-cell mdl-cell--12-col mdl-shadow--2dp"
    >
      <div class="mdl-card__supporting-text">
        {{ $t('payments.noPayments') }}
      </div>
    </div>
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
    ...mapGetters('payments', ['list', 'filter']),
  },
};
</script>
