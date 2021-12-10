<template>
  <table class="import-history-table mdl-data-table mdl-js-data-table">
    <thead>
      <tr>
        <th
          v-for="{ key, numeric, hideOnPhone } in columns"
          :key="key"
          :class="{
            'mdl-data-table__cell--non-numeric': !numeric,
            'mdl-cell--hide-phone': hideOnPhone,
          }"
        >
          {{ $t(`imports.${key}`) }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in imports"
        :key="item.id"
      >
        <td
          v-for="{ key, numeric, hideOnPhone } in columns"
          :key="key"
          :class="{
            'mdl-data-table__cell--non-numeric': !numeric,
            'mdl-cell--hide-phone': hideOnPhone,
          }"
        >
          <span v-if="key === 'status'">
            <import-status
              :status="item.status"
            />
          </span>
          <span v-else>{{ item[key] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ImportStatus from './ImportStatus.vue';

const COLUMNS = [
  { key: 'createdAt', hideOnPhone: true },
  { key: 'updatedAt' },
  { key: 'status' },
  { key: 'paymentsTotal', numeric: true, hideOnPhone: true },
  { key: 'paymentsCreated', numeric: true },
];

export default {
  components: { ImportStatus },

  props: {
    imports: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    columns() {
      return COLUMNS;
    },
  },
};
</script>
<style scoped>
.import-history-table {
  width: 100%;
}
</style>
