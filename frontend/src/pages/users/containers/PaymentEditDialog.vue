<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('edit') }}
    </h4>

    <div class="mdl-dialog__content">
      <payment-form
        :payment="payment"
        :errors="errors"
        @change="handleFieldChange"
        @submit="handleSubmit"
      />
    </div>

    <div class="mdl-dialog__actions">
      <button
        class="mdl-button mdl-button--raised mdl-button--accent"
        @click="handleSubmit"
      >
        {{ $t('submit') }}
      </button>

      <button
        class="mdl-button"
        @click="closeUserModal"
      >
        {{ $t('cancel') }}
      </button>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PaymentForm from '../components/PaymentForm.vue';

export default {
  components: {
    PaymentForm,
  },

  data() {
    return {
      payment: {},
    };
  },

  computed: {
    ...mapGetters('settings', ['groupColors']),
    ...mapGetters('payments', ['selected', 'errors']),
  },

  created() {
    if (!this.selected) return;

    this.payment = { ...this.selected };
  },

  methods: {
    ...mapActions('payments', ['updateSingle']),
    ...mapActions('users', ['closeUserModal']),

    handleFieldChange(attrs) {
      this.payment = { ...this.payment, ...attrs };
    },

    handleSubmit() {
      const { payment, updateSingle } = this;

      updateSingle(payment);
    },
  },
};
</script>

<style scoped>
.mdl-button--icon {
  float: right;
}
</style>
