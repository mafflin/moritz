<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">
        {{ $t('titles.payments') }}
      </h2>
      <span
        class="mdl-badge"
        :data-badge="total"
      />
    </div>

    <div class="mdl-card__supporting-text mdl-card--expand">
      <h6
        v-for="({ color, key, value }) in displayedAttributes"
        :key="key"
        class="m-0"
      >
        {{ $t(`payments.${key}`) }}:
        <span :class="color">{{ value }}</span>
      </h6>
    </div>

    <div class="mdl-card__actions">
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
    displayedAttributes() {
      return payment.numericAttributes
        .map((el) => ({ ...el, value: this[el.key] }));
    },
  },
};
</script>
