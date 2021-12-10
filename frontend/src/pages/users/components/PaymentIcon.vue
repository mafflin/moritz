<template>
  <span>
    <i
      :id="id"
      class="material-icons mdl-color-text--blue-grey"
    >
      {{ icon }}
    </i>

    <div
      v-if="transactionType"
      class="mdl-js mdl-tooltip"
      :data-mdl-for="id"
    >
      {{ transactionType }}
    </div>
  </span>
</template>

<script>
export default {
  props: {
    transactionType: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      id: `icon-${Math.random()}`,
    };
  },

  computed: {
    icon() {
      const { transactionType: type } = this;

      if (/card/i.test(type)) return 'credit_card';
      if (/sepa|transfer/i.test(type)) return 'account_balance';
      if (/income|topup/i.test(type)) return 'account_balance_wallet';
      if (/withdrawal|cash/i.test(type)) return 'atm';
      return 'euro_symbol';
    },
  },
};
</script>
