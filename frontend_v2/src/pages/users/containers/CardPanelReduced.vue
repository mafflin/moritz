<template>
  <div
    class="sticky mdl-grid mdl-shadow--2dp"
  >
    <div
      class="
        mdl-cell
        mdl-cell--2-col
        mdl-cell--3-col-tablet
        mdl-cell--2-col-phone
        mdl-cell--order-0-tablet
        mdl-cell--order-0-phone
      "
    >
      <date-picker-reduced
        :date="filter.date"
        @change="filterList"
      />
    </div>

    <div
      class="
        mdl-cell
        mdl-cell--5-col
        mdl-cell--7-col-tablet
        mdl-cell--4-col-phone
        mdl-cell--order-6-tablet
        mdl-cell--order-6-phone
      "
    >
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

    <div
      class="
        mdl-cell
        mdl-cell--bottom
        mdl-cell--1-col
        mdl-cell--order-7-tablet
        mdl-cell--order-2-phone
      "
    >
      <router-link
        :to="{ name: 'AddGroup' }"
        class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
      >
        <i class="material-icons">add</i>
      </router-link>
    </div>

    <div
      class="
        mdl-cell
        mdl-cell--3-col
        mdl-cell--4-col-tablet
        mdl-cell--4-col-phone
        mdl-cell--order-1-tablet
        mdl-cell--order-9-phone
      "
    >
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

    <div
      class="
        mdl-cell
        mdl-cell--bottom
        mdl-cell--1-col
        mdl-cell--order-2-tablet
        mdl-cell--order-1-phone
      "
    >
      <file-upload-button
        :loading="loading"
        class="mdl-button mdl-button--fab"
        accept=".csv"
        icon="file_upload"
        colored
        @select="uploadReport"
      />
    </div>
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
<style scoped>
.sticky {
  width: 100%;
  top: 0;
  position: sticky;
  background-color: white;
  z-index: 8;
}
</style>
