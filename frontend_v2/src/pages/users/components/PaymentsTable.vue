<template>
  <table class="payments-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <thead v-if="header">
      <tr>
        <th
          v-for="({ key, numeric, width }) in columns"
          :key="key"
          :width="width"
          :class="{
            'clickable': true,
            'mdl-data-table__cell': numeric,
            'mdl-data-table__cell--non-numeric': !numeric,
            'mdl-data-table__header--sorted-ascending': key === sort && asc,
            'mdl-data-table__header--sorted-descending': key === sort && !asc,
          }"
          @click="handleSort(key)"
        >
          {{ $t(`payments.${key}`) }}
        </th>

        <th v-if="actions">
          {{ $t('payments.actions') }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="!payments.length">
        <td
          id="empty-state"
          :colspan="colspan"
        >
          <h6>{{ $t('payments.noPayments') }}</h6>
        </td>
      </tr>

      <payment-table-row
        v-for="payment in payments"
        :key="payment.id"
        :payment="payment"
        :columns="columns"
        :clickable="clickable"
        :actions="actions"
        :class="{ 'clickable': clickable }"
        @click="handleRowClick(payment)"
      />
    </tbody>
  </table>
</template>

<script>
import { SORTABLE_PAYMENT_ATTRIBUTES } from '../../../utils/globals';
import PaymentTableRow from './PaymentTableRow.vue';

export default {
  components: {
    PaymentTableRow,
  },

  props: {
    payments: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => SORTABLE_PAYMENT_ATTRIBUTES,
    },
    header: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: String,
      default: null,
    },
    asc: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'row-click',
    'sort',
  ],

  computed: {
    colspan() {
      return [...this.columns, this.actions]
        .filter((col) => !!col)
        .length;
    },
  },

  methods: {
    handleSort(sort) {
      const asc = this.sort !== sort ? this.asc : !this.asc;

      this.$emit('sort', { sort, asc });
    },

    handleRowClick(item) {
      if (!this.clickable) return;

      this.$emit('row-click', item);
    },
  },
};
</script>

<style lang="css" scoped>
#empty-state {
  text-align: center;
}

.details {
  width: 35%;
}

.mdl-data-table {
  width: 100%;
  table-layout: fixed;
}

th {
  white-space: normal;
}
</style>
