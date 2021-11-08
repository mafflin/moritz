<template>
  <div class="mdl-layout mdl-layout">
    <app-header />

    <main class="mdl-layout__content">
      <loading />

      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from './containers/Header.vue';
import Loading from './containers/Loading.vue';

export default {
  components: {
    AppHeader,
    Loading,
  },
};
</script>
