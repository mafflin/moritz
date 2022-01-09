<template>
  <form
    @submit.prevent="$emit('submit')"
  >
    <text-input
      v-model="note"
      :label="$t('payments.note')"
      :errors="errors.note"
      focus
    />

    <text-input
      v-model="withdrawal"
      :label="$t('payments.withdrawal')"
      :errors="errors.withdrawal"
      type="number"
    />

    <input
      class="hidden"
      type="submit"
      value="Submit"
    >
  </form>
</template>

<script>
import focusOnInput from '../../../mixins/focusOnInput';
import TextInput from '../../../components/TextInput.vue';

export default {
  components: {
    TextInput,
  },

  mixins: [focusOnInput],

  props: {
    payment: {
      type: Object,
      default: null,
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
