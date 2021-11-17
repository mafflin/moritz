<template>
  <div>
    <router-view />

    <div class="mdl-grid">
      <payments-card
        :total="total"
        :debit="debit"
        :credit="credit"
        :delta="delta"
        :withdrawal="withdrawal"
      />

      <groups-card
        :groups="listWithUnmatched"
        :selected-id="filter.groupId"
        @select="filterList"
        @open-delete-group="openDeleteGroup"
        @open-edit-group="openEditGroup"
        @open-edit-rules="openEditRules"
      />

      <date-filter-card
        :filter="filter"
        :loading="loading"
        @submit="filterList"
      />
    </div>

    <div class="mdl-grid">
      <payments-table
        class="mdl-cell mdl-cell--12-col"
        :payments="list"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GroupsCard from './components/GroupsCard.vue';
import DateFilterCard from './components/DateFilterCard.vue';
import PaymentsCard from './components/PaymentsCard.vue';
import PaymentsTable from './components/PaymentsTable.vue';

export default {
  components: {
    GroupsCard,
    DateFilterCard,
    PaymentsCard,
    PaymentsTable,
  },

  computed: {
    ...mapGetters('users', ['current']),
    ...mapGetters('payments', [
      'loading',
      'list',
      'total',
      'debit',
      'credit',
      'delta',
      'withdrawal',
      'filter',
    ]),
    ...mapGetters('groups', ['listWithUnmatched']),
    ...mapGetters('rules', {
      rules: 'list',
    }),
  },

  mounted() {
    this.fetchList();
  },

  methods: {
    ...mapActions('payments', [
      'fetchList',
      'filterList',
      'openEditGroup',
      'handleQueryParamsUpdate',
    ]),
    ...mapActions('groups', ['openDeleteGroup', 'openEditGroup', 'openEditRules']),
  },
};
</script>
