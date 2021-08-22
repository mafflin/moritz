<template>
  <div class="mx-1">
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="withdrawal"
            label="Withdrawal"
            autofocus
          />
        </v-col>

        <v-col
          cols="12"
          class="text-right"
        >
          <v-btn
            :disable="loading"
            type="submit"
            color="orange"
            text
          >
            Add Withdrawal
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    payment: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      withdrawal: null,
    };
  },

  mounted() {
    this.withdrawal = this.payment.withdrawal;
  },

  methods: {
    handleSubmit() {
      const { withdrawal, payment, onSubmit } = this;

      onSubmit({ id: payment.id, withdrawal });
    },
  },
};
</script>
