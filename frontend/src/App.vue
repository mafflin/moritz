<template>
  <v-app id="app">
    <nav-bar />
    <loading />

    <v-main>
      <router-view />
    </v-main>

    <notifications />
  </v-app>
</template>

<script>
import Loading from './components/Loading.vue';
import NavBar from './components/NavBar.vue';
import Notifications from './components/Notifications.vue';

export default {
  name: 'App',

  components: {
    Loading,
    NavBar,
    Notifications,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
