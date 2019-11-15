<template>
  <v-snackbar
    :value="error"
    color="error"
    multi-line
    top
  >
    {{ error }}
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notifications',

  computed: {
    ...mapGetters('client', ['error'])
  }
};
</script>

<style scoped>
</style>
