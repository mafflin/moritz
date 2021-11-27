<template>
  <div>
    <router-view />

    <transition
      name="slide-in"
      mode="out-in"
    >
      <card-panel-reduced
        v-if="panelReduced"
        ref="low"
        :style="{'--height': '-88px'}"
      />
      <card-panel
        v-else
        ref="high"
        :style="{'--height': '-324px'}"
      />
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
import CardPanelReduced from './containers/CardPanelReduced.vue';
import PaymentsTable from './components/PaymentsTable.vue';
import ReducePanelButton from './components/ReducePanelButton.vue';
import SearchResults from './components/SearchResults.vue';

export default {
  components: {
    CardPanel,
    CardPanelReduced,
    PaymentsTable,
    ReducePanelButton,
    SearchResults,
  },

  computed: {
    ...mapGetters('settings', ['panelReduced']),
    ...mapGetters('search', ['q', 'list']),
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
.slide-in-enter-active {
  transition: all 0.5s ease;
}

.slide-in-leave-active {
  transition: all 0.5s ease;
}

.slide-in-leave-to,
.slide-in-enter-from {
  transform: translateY(var(--height));
}
</style>
