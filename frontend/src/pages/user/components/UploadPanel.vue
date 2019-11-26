<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-left">
      <span>
        <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
        <span>Upload CSV</span>
      </span>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-form @submit.prevent="handleSubmit">
        <v-row align="center">
          <v-col cols="8" md="6">
            <v-file-input
              :value="file"
              @change="setFile"
              show-size
              accept="csv/*"
              label="Select report"
            />
          </v-col>

          <v-col cols="4" md="6">
            <v-btn
              @click="uploadReport"
              :disabled="loading || !file"
              color="orange"
              text
            >Upload File</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "UploadPanel",

  computed: {
    ...mapGetters("reports", ["file"]),
    ...mapGetters("client", ["loading"])
  },

  methods: {
    ...mapActions("reports", ["uploadReport"]),
    ...mapMutations("reports", ["setFile"])
  }
};
</script>

<style scoped>
</style>
