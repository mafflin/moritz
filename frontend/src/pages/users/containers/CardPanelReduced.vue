<template>
  <div
    class="sticky mdl-grid mdl-shadow--2dp"
  >
    <div
      class="
        mdl-cell
        mdl-cell--3-col
        mdl-cell--3-col-tablet
        mdl-cell--3-col-phone
        mdl-cell--order-0-tablet
        mdl-cell--order-0-phone
        mdl-cell--middle
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
        mdl-cell--8-col-tablet
        mdl-cell--4-col-phone
        mdl-cell--order-6-tablet
        mdl-cell--order-6-phone
        mdl-cell--middle
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

      <router-link
        :to="{ name: 'AddGroup' }"
        class="add-button mdl-button mdl-js-button mdl-button--icon mdl-color--orange"
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
        mdl-cell--middle
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
        mdl-cell--1-col
        mdl-cell--order-2-tablet
        mdl-cell--order-1-phone
        mdl-cell--middle
      "
    >
      <file-upload-button
        :loading="loading"
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
    ...mapGetters('imports', ['loading']),
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
    ...mapActions('imports', { uploadReport: 'createSingle' }),

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

.add-button {
  vertical-align: -webkit-baseline-middle;
}
</style>
