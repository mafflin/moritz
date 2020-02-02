<template>
  <div class="mx-1">
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="note" label="Note" autofocus />
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn :disable="loading" type="submit" color="purple" text>Add Note</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "NoteAdd",

  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    payment: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      note: null
    };
  },

  mounted() {
    this.note = this.payment.note;
  },

  methods: {
    handleSubmit() {
      const { note, payment, onSubmit } = this;

      onSubmit({ id: payment.id, note });
    }
  }
};
</script>
