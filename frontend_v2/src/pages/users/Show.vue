<template>
  <div>
    <router-view />

    <card-panel-collapsed v-if="collapsed" />
    <card-panel v-else />

    <collapse-button
      :collapsed="collapsed"
      @toggle="toggleCollapsed"
    />

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
import CardPanel from './containers/CardPanel.vue';
import CardPanelCollapsed from './containers/CardPanelCollapsed.vue';
import CollapseButton from './components/CollapseButton.vue';
import PaymentsTable from './components/PaymentsTable.vue';

export default {
  components: {
    CardPanel,
    CardPanelCollapsed,
    CollapseButton,
    PaymentsTable,
  },

  computed: {
    ...mapGetters('settings', ['collapsed']),
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
    ...mapActions('settings', ['toggleCollapsed']),
    ...mapActions('payments', ['fetchList', 'filterList']),
  },
};
</script>

<style scoped>
.collapse-button {
  text-align: center;
}
</style>
