<template>
  <div
    class="mdl-grid"
  >
    <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp">
      <div class="mdl-grid">
        <div class="mdl-cell">
          <payments-info-collapsed
            :total="total"
            :debit="debit"
            :credit="credit"
            :delta="delta"
            :withdrawal="withdrawal"
            @on-report-upload="uploadReport"
          />
        </div>

        <div class="mdl-cell">
          <groups-card-collapsed
            :groups="listWithUnmatched"
            :selected-id="filter.groupId"
            @select="filterList"
            @open-edit-rules="openEditRules"
          />
        </div>

        <div class="mdl-cell">
          <date-picker-collapsed
            :date="filter.date"
            @change="filterList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DatePickerCollapsed from '../components/DatePickerCollapsed.vue';
import GroupsCardCollapsed from '../components/GroupsCardCollapsed.vue';
import PaymentsInfoCollapsed from '../components/PaymentsInfoCollapsed.vue';

export default {
  components: {
    DatePickerCollapsed,
    PaymentsInfoCollapsed,
    GroupsCardCollapsed,
  },

  computed: {
    ...mapGetters('groups', ['listWithUnmatched']),
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
  },
};
</script>
