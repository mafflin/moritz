<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <nav-bar />

    <main class="mdl-layout__content">
      <loading-bar />
      <router-view name="panel" />

      <router-view />
    </main>

    <snack-bar />
  </div>
</template>

<script>
import NavBar from './containers/NavBar.vue';
import LoadingBar from './containers/LoadingBar.vue';
import SnackBar from './containers/SnackBar.vue';

export default {
  components: {
    NavBar,
    LoadingBar,
    SnackBar,
  },
};
</script>
