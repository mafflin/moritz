<template>
  <table class="payments-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <thead>
      <tr>
        <th
          v-for="({ value, width }, index) in headers"
          :key="index"
          :width="width"
          class="mdl-data-table__cell--non-numeric"
        >
          {{ $t(`payments.${value}`) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="payment in payments"
        :key="payment.id"
      >
        <td
          v-for="({ value }, index) in headers"
          :key="index"
          class="mdl-data-table__cell--non-numeric"
        >
          {{ payment[value] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const HEADERS = [
  { value: 'bookedAt', width: '8%' },
  { value: 'bank', width: '7%' },
  { value: 'transactionType', width: '11%' },
  { value: 'details' },
  { value: 'beneficiary', width: '15%' },
  { value: 'note', width: '10%' },
  { value: 'withdrawal', width: '10%' },
  { value: 'debit', width: '7%' },
  { value: 'credit', width: '7%' },
];

export default {
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    headers() {
      return HEADERS;
    },
  },
};
</script>

<style lang="css" scoped>
.mdl-data-table {
  width: 100%;
  table-layout: fixed;
}

th, td {
  white-space: normal;
}

th:last-child, td:last-child {
  text-align: right;
}
</style>
