<template>
  <form
    @submit.prevent="$emit('submit')"
    @keydown.enter="$emit('submit')"
  >
    <div
      :class="{
        'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
        'is-invalid': errors.note,
        'is-dirty': noteLocal,
      }"
    >
      <input
        id="payment-note"
        ref="input"
        v-model="note"
        class="mdl-textfield__input"
        type="text"
      >
      <label
        for="payment-note"
        class="mdl-textfield__label"
      >
        {{ $t('payments.note') }}
      </label>
      <span
        class="mdl-textfield__error"
        visibility="visibile"
      >
        {{ errors.note }}
      </span>
    </div>

    <div
      :class="{
        'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
        'is-invalid': errors.withdrawal,
        'is-dirty': withdrawalLocal.toString(),
      }"
    >
      <input
        id="payment-withdrawal"
        v-model="withdrawal"
        class="mdl-textfield__input"
        type="number"
      >
      <label
        for="payment-withdrawal"
        class="mdl-textfield__label"
      >
        {{ $t('payments.withdrawal') }}
      </label>
      <span
        class="mdl-textfield__error"
        visibility="visibile"
      >
        {{ errors.withdrawal }}
      </span>
    </div>
  </form>
</template>

<script>
import focusOnInput from '../../../mixins/focusOnInput';

export default {
  mixins: [focusOnInput],

  props: {
    payment: {
      type: Object,
      default: null,
    },
    colors: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: [
    'change',
    'submit',
  ],

  data() {
    return {
      noteLocal: '',
      withdrawalLocal: '',
    };
  },

  computed: {
    note: {
      get() {
        return this.noteLocal;
      },

      set(note) {
        this.noteLocal = note;

        this.$emit('change', { note });
      },
    },

    withdrawal: {
      get() {
        return this.withdrawalLocal;
      },

      set(withdrawal) {
        this.withdrawalLocal = withdrawal;

        this.$emit('change', { withdrawal });
      },
    },
  },

  mounted() {
    if (!this.payment) return;

    this.noteLocal = this.payment.note;
    this.withdrawalLocal = this.payment.withdrawal;
  },
};
</script>

<style scoped>
.mdl-textfield {
  width: 100%;
}
</style>
