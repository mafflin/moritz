<template>
  <table class="payments-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <thead v-if="header">
      <tr>
        <th
          v-for="column in columns"
          :id="`table-header-${column}`"
          :key="column"
          :class="{
            'mdl-data-table__cell--non-numeric clickable': true,
            'mdl-data-table__header--sorted-ascending': column === sort && asc,
            'mdl-data-table__header--sorted-descending': column === sort && !asc,
          }"
          @click="handleSort(column)"
        >
          {{ $t(`payments.${column}`) }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="!payments.length">
        <td
          id="empty-state"
          :colspan="columns.length"
        >
          <h4>{{ $t('payments.noPayments') }}</h4>
        </td>
      </tr>

      <tr
        v-for="payment in payments"
        :key="payment.id"
        :ref="payment.id"
        :class="{
          'clickable': clickable,
          'highlighted': payment.id === highlightedId,
        }"
        @click="handleRowClick(payment)"
      >
        <td
          v-for="(column, index) in columns"
          :key="index"
          class="mdl-data-table__cell--non-numeric"
        >
          <div>
            {{ payment[column] }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import payment from '../../../utils/payment';

export default {
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => payment.sortableAttributes,
    },
    highlightedId: {
      type: String,
      default: null,
    },
    sort: {
      type: String,
      default: null,
    },
    asc: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Boolean,
      default: true,
    },
  },

  emits: [
    'row-click',
    'sort',
  ],

  updated() {
    const { highlightedId, $refs: { [highlightedId]: highlighted } } = this;
    if (!highlighted) return;

    highlighted.scrollIntoView({ behaiviour: 'smooth', block: 'start', inline: 'nearest' });
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

#table-header-details {
  width: 35%;
}

.mdl-data-table {
  width: 100%;
  table-layout: fixed;
}

.highlighted {
  background-color: skyblue;
}

th, td {
  white-space: normal;
}

th:last-child, td:last-child {
  text-align: right;
}
</style>
