<template>
  <table class="payments-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          :class="{
            'mdl-data-table__cell--non-numeric clickable': true,
            'mdl-data-table__header--sorted-ascending': header === sort && asc,
            'mdl-data-table__header--sorted-descending': header === sort && !asc,
          }"
          @click="handleSort(header)"
        >
          {{ $t(`payments.${header}`) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!payments.length">
        <td
          id="empty-state"
          :colspan="headers.length"
        >
          <h4>{{ $t('payments.noPayments') }}</h4>
        </td>
      </tr>

      <tr
        v-for="payment in payments"
        :key="payment.id"
      >
        <td
          v-for="(header, index) in headers"
          :key="index"
          class="mdl-data-table__cell--non-numeric"
        >
          <div>
            {{ payment[header] }}
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
    'sort',
  ],

  computed: {
    headers() {
      return payment.sortableAttributes;
    },
  },

  methods: {
    handleSort(sort) {
      const asc = this.sort !== sort ? this.asc : !this.asc;

      this.$emit('sort', { sort, asc });
    },
  },
};
</script>

<style lang="css" scoped>
#empty-state {
  text-align: center;
}

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
