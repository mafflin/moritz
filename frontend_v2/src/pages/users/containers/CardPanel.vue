<template>
  <div
    class="mdl-grid"
  >
    <date-filter-card
      :filter="filter"
      :loading="loading"
      @submit="filterList"
    />

    <groups-card
      :groups="listWithUnmatched"
      :selected-id="filter.groupId"
      @select="filterList"
      @open-edit-rules="openEditRules"
    />

    <payments-info-card
      :total="total"
      :debit="debit"
      :credit="credit"
      :delta="delta"
      :withdrawal="withdrawal"
      :loading="loading"
      @on-report-upload="uploadReport"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DateFilterCard from '../components/DateFilterCard.vue';
import GroupsCard from '../components/GroupsCard.vue';
import PaymentsInfoCard from '../components/PaymentsInfoCard.vue';

export default {
  components: {
    DateFilterCard,
    GroupsCard,
    PaymentsInfoCard,
  },

  computed: {
    ...mapGetters('groups', ['listWithUnmatched']),
    ...mapGetters('reports', ['loading']),
    ...mapGetters('payments', [
      'loading',
      'total',
      'debit',
      'credit',
      'delta',
      'withdrawal',
      'filter',
    ]),
  },

  methods: {
    ...mapActions('payments', ['filterList']),
    ...mapActions('groups', ['openEditRules']),
    ...mapActions('reports', { uploadReport: 'createSingle' }),
  },
};
</script>
