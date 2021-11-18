<template>
  <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp">
    <span
      class="mdl-badge mdl-badge--overlap clickable"
      data-badge="↕️"
      @click="$emit('toggle-collapsed')"
    />

    <div class="mdl-grid">
      <div class="mdl-cell">
        <payments-info-collapsed
          :total="total"
          :debit="debit"
          :credit="credit"
          :delta="delta"
          :withdrawal="withdrawal"
        />
      </div>

      <div class="mdl-cell">
        <groups-card-collapsed
          :groups="groups"
          :selected-id="selectedGroupId"
          @select="value => $emit('group-select', value)"
        />
      </div>

      <div class="mdl-cell">
        <date-picker-collapsed
          :date="filter.date"
          @change="value => $emit('date-change', value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatePickerCollapsed from './DatePickerCollapsed.vue';
import GroupsCardCollapsed from './GroupsCardCollapsed.vue';
import PaymentsInfoCollapsed from './PaymentsInfoCollapsed.vue';

export default {
  components: {
    DatePickerCollapsed,
    PaymentsInfoCollapsed,
    GroupsCardCollapsed,
  },

  props: {
    groups: {
      type: Array,
      default: () => [],
    },
    selectedGroupId: {
      type: String,
      default: null,
    },
    filter: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    debit: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
    delta: {
      type: Number,
      default: 0,
    },
    withdrawal: {
      type: Number,
      default: 0,
    },
  },

  emits: [
    'date-change',
    'group-select',
    'toggle-collapsed',
  ],
};
</script>
