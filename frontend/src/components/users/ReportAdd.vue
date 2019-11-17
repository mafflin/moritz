<template>
  <div class="mx-1">
    <v-form @submit.prevent="handleSubmit">
      <v-row align="center">
        <v-col cols="8">
          <v-file-input v-model="file" show-size accept="csv/*" label="Select report" />
        </v-col>

        <v-col cols="4">
          <v-btn @click="handleSubmit" color="orange" text>Upload report</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { fileEncoder } from "../../utils";

export default {
  name: "ReportAdd",

  props: {
    onSubmit: {
      type: Function,
      required: true
    }
  },

  data: () => ({
    file: null
  }),

  methods: {
    async handleSubmit() {
      const {
        target: { result }
      } = await fileEncoder(this.file);
      debugger
      const encoded = window.btoa(unescape(encodeURIComponent(result)));
      this.onSubmit({ encoded });
    }
  }
};
</script>
