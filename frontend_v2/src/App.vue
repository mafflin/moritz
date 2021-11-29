<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <app-header />

    <main class="mdl-layout__content">
      <loading />
      <router-view name="panel" />

      <router-view />
    </main>

    <snackbar />
  </div>
</template>

<script>
import AppHeader from './containers/Header.vue';
import Loading from './containers/Loading.vue';
import Snackbar from './containers/Snackbar.vue';

export default {
  components: {
    AppHeader,
    Loading,
    Snackbar,
  },
};
</script>
