<template>
  <v-dialog
    :value="true"
    max-width="1080px"
    @input="goToHomePage"
  >
    <v-container
      id="the-map"
      fill-height
    >
      The Map
    </v-container>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    this.mountMap('the-map');
    this.drawLocations();
  },

  methods: {
    ...mapActions('map', ['mountMap', 'drawLocations']),
    ...mapActions('router', ['goToHomePage']),
  },
};
</script>

<style scoped>
  #the-map {
    height: 90vh;
  }
</style>
