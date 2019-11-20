<template>
  <v-card>
    <v-card-title>
      <v-icon large left>mdi-file-document-box-multiple-outline</v-icon>
      <span class="title font-weight-light">Reports</span>
    </v-card-title>

    <v-card-text class="text--primary text-left">
      <v-form @submit.prevent="handleSubmit">
        <v-row align="center">
          <v-col cols="8" md="6">
            <v-file-input v-model="file" show-size accept="csv/*" label="Select report" />
          </v-col>

          <v-col cols="4" md="6">
            <v-btn
              @click="handleSubmit"
              :disabled="loading || !file"
              color="orange"
              text
            >Upload report</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { fileEncoder } from "../../utils";

export default {
  name: "ReportsCard",

  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    loading: {
      type: Boolean,
      default: true
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
      const encoded = window.btoa(unescape(encodeURIComponent(result)));
      this.onSubmit({ encoded });
    }
  }
};
</script>

<style scoped>
</style>
