<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <navbar />

    <main class="mdl-layout__content">
      <loading />
      <router-view name="panel" />

      <router-view />
    </main>

    <snackbar />
  </div>
</template>

<script>
import Navbar from './containers/Navbar.vue';
import Loading from './containers/Loading.vue';
import Snackbar from './containers/Snackbar.vue';

export default {
  components: {
    Navbar,
    Loading,
    Snackbar,
  },
};
</script>
