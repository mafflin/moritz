<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <user-card :user="selected" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-expansion-panels accordion>
            <upload-panel />
            <groups-panel />
            <summary-panel />
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <filters-panel />
          <hr>
          <payments-table :payments="payments" />
        </v-card>
      </v-col>
    </v-row>

    <router-view />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FiltersPanel from '../../components/FiltersPanel.vue';
import GroupsPanel from '../../components/GroupsPanel.vue';
import PaymentsTable from '../../components/PaymentsTable.vue';
import SummaryPanel from '../../components/SummaryPanel.vue';
import UploadPanel from '../../components/UploadPanel.vue';
import UserCard from '../../components/UserCard.vue';


export default {
  name: 'Overview',

  components: {
    FiltersPanel,
    GroupsPanel,
    PaymentsTable,
    SummaryPanel,
    UploadPanel,
    UserCard,
  },

  computed: {
    ...mapGetters('users', ['selected']),
    ...mapGetters('payments', ['payments']),
  },

  mounted() {
    this.fetchPayments();
  },

  methods: {
    ...mapActions('payments', ['fetchPayments']),
  },
};
</script>

<style scoped>
</style>
