<template>
  <div>
    <router-view />
    <router-view name="panel" />

    <expand-panel-button
      :panel-expanded="panelExpanded"
      @toggle="togglePanel"
    />

    <div class="mdl-grid">
      <payments-table
        class="mdl-cell mdl-cell--12-col"
        :payments="sortedList"
        :sort="filter.sort"
        :asc="filter.asc"
        actions
        @sort="filterList"
      />
    </div>

    <search-results
      :q="q"
      :results="list"
      @search-item-click="filterPaymentsList"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ExpandPanelButton from './components/ExpandPanelButton.vue';
import PaymentsTable from './components/PaymentsTable.vue';
import SearchResults from './components/SearchResults.vue';

export default {
  components: {
    ExpandPanelButton,
    PaymentsTable,
    SearchResults,
  },

  computed: {
    ...mapGetters('imports', { imports: 'list' }),
    ...mapGetters('payments', ['loading', 'sortedList', 'filter']),
    ...mapGetters('search', ['q', 'list']),
    ...mapGetters('settings', ['panelExpanded']),
  },

  mounted() {
    this.fetchList();
  },

  methods: {
    ...mapActions('settings', ['togglePanel']),
    ...mapActions('payments', ['fetchList', 'filterList']),
    ...mapActions('search', ['filterPaymentsList']),
  },
};
</script>
