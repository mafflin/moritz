<template>
  <div class="mdl-grid">
    <div class="mdl-layout-spacer" />

    <router-view />

    <div class="mdl-layout-spacer" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('sessions', ['errors']),
  },

  methods: {
    ...mapActions('sessions', ['createCurrent']),
  },
};
</script>
