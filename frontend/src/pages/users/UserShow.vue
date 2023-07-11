<template>
  <div>
    <router-view />
    <router-view name="panel" />

    <expand-button
      :expanded="panelExpanded"
      @toggle="togglePanel"
    />

    <div class="mdl-grid">
      <payments-table
        class="mdl-cell mdl-cell--12-col"
        :payments="sortedList"
        :sort="filter.sort"
        :asc="filter.asc"
        actions
        clickable
        @sort="filterList"
        @row-click="openInfoPayment"
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
import ExpandButton from './components/ExpandButton.vue';
import PaymentsTable from './components/PaymentsTable.vue';
import SearchResults from './components/SearchResults.vue';

export default {
  components: {
    ExpandButton,
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
    ...mapActions('payments', ['fetchList', 'filterList', 'openInfoPayment']),
    ...mapActions('search', ['filterPaymentsList']),
  },
};
</script>
