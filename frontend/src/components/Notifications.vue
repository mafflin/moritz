<template>
  <v-snackbar
    :value="error || message"
    :color="error ? 'error' : 'success'"
    multi-line
    top
  >
    {{ error || message }}
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('client', ['error']),
    ...mapGetters('ui', ['message']),
  },
};
</script>

<style scoped>
</style>
