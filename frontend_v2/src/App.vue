<template>
  <div>
    <app-header />

    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppHeader from './containers/Header.vue';

export default defineComponent({
  components: {
    AppHeader,
  },
});
</script>
