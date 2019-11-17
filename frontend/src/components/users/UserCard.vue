<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="user.avatar"
    >
      <v-card-title>{{ user.name }}</v-card-title>
    </v-img>

    <v-card-text class="text--primary text-left">
      <report-add :onSubmit="onFileUpload" />
    </v-card-text>
  </v-card>
</template>

<script>
import ReportAdd from "./ReportAdd.vue";

export default {
  name: "UserCard",

  components: { ReportAdd },

  props: {
    user: {
      type: Object,
      required: true
    },
    onFileUpload: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
