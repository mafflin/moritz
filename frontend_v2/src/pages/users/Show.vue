<template>
  <div>
    <router-view />

    <div
      v-if="collapsed"
      class="mdl-grid"
    >
      <collapsed-panel
        :groups="listWithUnmatched"
        :filter="filter"
        :total="total"
        :debit="debit"
        :credit="credit"
        :delta="delta"
        :withdrawal="withdrawal"
        :selected-group-id="filter.groupId"
        @group-select="filterList"
        @date-change="filterList"
        @toggle-collapsed="toggleCollapsed"
      />
    </div>

    <div
      v-else
      class="mdl-grid"
    >
      <payments-info-card
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
        :payments="sortedList"
        :sort="filter.sort"
        :asc="filter.asc"
        @sort="filterList"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CollapsedPanel from './components/CollapsedPanel.vue';
import DateFilterCard from './components/DateFilterCard.vue';
import GroupsCard from './components/GroupsCard.vue';
import PaymentsInfoCard from './components/PaymentsInfoCard.vue';
import PaymentsTable from './components/PaymentsTable.vue';

export default {
  components: {
    CollapsedPanel,
    DateFilterCard,
    GroupsCard,
    PaymentsInfoCard,
    PaymentsTable,
  },

  computed: {
    ...mapGetters('settings', ['collapsed']),
    ...mapGetters('users', ['current']),
    ...mapGetters('payments', [
      'loading',
      'sortedList',
      'total',
      'debit',
      'credit',
      'delta',
      'withdrawal',
      'filter',
    ]),
    ...mapGetters('groups', ['listWithUnmatched']),
    ...mapGetters('rules', { rules: 'list' }),
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
    ...mapActions('settings', ['toggleCollapsed']),
  },
};
</script>
