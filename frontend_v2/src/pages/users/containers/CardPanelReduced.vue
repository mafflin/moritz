<template>
  <div
    class="panel mdl-grid mdl-shadow--2dp"
  >
    <div class="mdl-cell mdl-cell--2-col">
      <date-picker-reduced
        :date="filter.date"
        @change="filterList"
      />
    </div>

    <div class="mdl-cell mdl-cell--5-col">
      <group-chip
        v-for="group in listWithUnmatched"
        :key="group.id"
        :group="group"
        :selected-id="filter.groupId"
        extendable
        selectable
        @select="handleGroupSelect"
        @open-edit-rules="openEditRules"
      />
    </div>

    <router-link
      :to="{ name: 'AddGroup' }"
      class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
    >
      <i class="material-icons">add</i>
    </router-link>

    <div class="mdl-cell mdl-cell--3-col">
      <payments-summary
        :total="total"
        :debit="debit"
        :credit="credit"
        :delta="delta"
        :withdrawal="withdrawal"
        :loading="loading"
        @on-report-upload="uploadReport"
      />
    </div>

    <file-upload-button
      :loading="loading"
      class="mdl-button mdl-button--fab"
      accept=".csv"
      icon="file_upload"
      colored
      @select="uploadReport"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DatePickerReduced from '../components/DatePickerReduced.vue';
import FileUploadButton from '../../../components/FileUploadButton.vue';
import GroupChip from '../components/GroupChip.vue';
import PaymentsSummary from '../components/PaymentsSummary.vue';

export default {
  components: {
    DatePickerReduced,
    FileUploadButton,
    GroupChip,
    PaymentsSummary,
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

    handleGroupSelect(groupId) {
      this.filterList({ groupId });
    },
  },
};
</script>
