<template>
  <div class="mdl-grid">
    <span
      class="m-0 mdl-cell--6-col"
    >
      {{ $t('payments.debit') }}:
      <span class="value">{{ debit }}</span>
    </span>

    <span
      class="m-0 mdl-cell--6-col"
    >
      {{ $t('payments.delta') }}:
      <span
        class="value"
      >{{ delta }}</span>
    </span>
    <span
      class="value mdl-badge"
      :data-badge="total"
    />

    <span
      class="m-0 mdl-cell--6-col"
    >
      {{ $t('payments.credit') }}:
      <span class="value">{{ credit }}</span>
    </span>

    <span
      class="m-0 mdl-cell"
    >
      {{ $t('payments.withdrawal') }}:
      <span class="value">{{ withdrawal }}</span>
    </span>
  </div>
</template>

<script>
export const ATTRIBUTES = [
  'debit',
  'credit',
  'withdrawal',
];

export default {
  props: {
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
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    attributes() {
      return ATTRIBUTES
        .map((key) => ({ key, value: this[key] }));
    },
  },
};
</script>

<style scoped>
.mdl-cell--6-col {
  font-size: 16px;
}

.value {
  font-weight: 700;
}
</style>
