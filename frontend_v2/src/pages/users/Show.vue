<template>
  <div>
    <router-view />

    <transition name="slide-fade">
      <card-panel v-if="!panelReduced" />
    </transition>

    <reduce-panel-button
      :panel-reduced="panelReduced"
      @toggle="togglePanelReduced"
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
import CardPanel from './containers/CardPanel.vue';
import ReducePanelButton from './components/ReducePanelButton.vue';
import PaymentsTable from './components/PaymentsTable.vue';
import SearchResults from './components/SearchResults.vue';

export default {
  components: {
    CardPanel,
    ReducePanelButton,
    PaymentsTable,
    SearchResults,
  },

  computed: {
    ...mapGetters('settings', ['panelReduced']),
    ...mapGetters('search', ['q', 'list']),
    ...mapGetters('users', ['current']),
    ...mapGetters('payments', [
      'loading',
      'sortedList',
      'filter',
    ]),
  },

  mounted() {
    this.fetchList();
  },

  methods: {
    ...mapActions('settings', ['togglePanelReduced']),
    ...mapActions('payments', ['fetchList', 'filterList']),
    ...mapActions('search', ['filterPaymentsList']),
  },
};
</script>

<style scoped>
.collapse-button {
  text-align: center;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(57,.21,.69,1.25);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
