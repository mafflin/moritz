<template>
  <v-container
    id="the-map"
    fill-height
    fluid
  >
    The Map
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    this.mountMap('the-map');
  },

  methods: {
    ...mapActions('map', ['mountMap']),
  },
};
</script>

<style scoped>
  #the-map {
    height: 100%;
  }
</style>
