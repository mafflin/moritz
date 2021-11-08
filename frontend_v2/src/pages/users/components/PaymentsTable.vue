<template>
  <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <thead>
      <tr>
        <th
          v-for="({ value }, index) in headers"
          :key="index"
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
        >
          {{ payment[value] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const HEADERS = [
  { value: 'bookedAt', style: { 'text-align': 'left' } },
  { value: 'bank' },
  { value: 'transactionType' },
  { value: 'details', style: { 'text-align': 'left' } },
  { value: 'beneficiary' },
  { value: 'note', style: { width: '10%' } },
  { value: 'withdrawal', style: { width: '10%' } },
  { value: 'debit', style: { width: '10%' } },
  { value: 'credit', style: { width: '10%' } },
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

<style lang="scss" scoped>
.mdl-data-table {
  width: 100%
}

.mdl-data-table {
  th, td {
    text-align: left;

    &:last-child {
      text-align: right;
    }
  }

}
</style>
