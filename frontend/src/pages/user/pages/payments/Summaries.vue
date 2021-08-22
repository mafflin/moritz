<template>
  <v-dialog
    :value="true"
    max-width="1080px"
    @input="goToHomePage"
  >
    <v-card>
      <summaries-table :summaries="summaries" />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SummariesTable from '../../components/SummariesTable.vue';

export default {
  components: {
    SummariesTable,
  },

  computed: {
    ...mapGetters('summaries', ['summaries']),
  },

  methods: {
    ...mapActions('router', ['goToHomePage']),
  },
};
</script>

<style scoped>
</style>
