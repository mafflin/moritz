<template>
  <div class="mdl-grid">
    <span
      class="mdl-badge mdl-badge--overlap"
      :data-badge="total"
    />

    <div class="mdl-cell--5-col">
      <p
        v-for="({ color, key, value }) in firstCol"
        :key="key"
        class="m-0"
      >
        {{ $t(`payments.${key}`) }}:
        <span :class="color">{{ value }}</span>
      </p>
    </div>

    <div class="mdl-cell--5-col">
      <p
        v-for="({ color, key, value }) in secondCol"
        :key="key"
        class="m-0"
      >
        {{ $t(`payments.${key}`) }}:
        <span :class="color">{{ value }}</span>
      </p>
    </div>

    <div class="mdl-cell--2-col action">
      <router-link
        to="#"
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--colored"
      >
        <i class="material-icons">file_upload</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import payment from '../../../utils/payment';

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
  },

  computed: {
    firstCol() {
      return payment.numericAttributes
        .filter(({ key }) => ['debit', 'credit'].includes(key))
        .map((el) => ({ ...el, value: this[el.key] }));
    },

    secondCol() {
      return payment.numericAttributes
        .filter(({ key }) => !['debit', 'credit'].includes(key))
        .map((el) => ({ ...el, value: this[el.key] }));
    },
  },
};
</script>

<style scoped>
.action {
  text-align: end;
}
</style>
