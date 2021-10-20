<template>
  <div>{{ current.name }}</div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  computed: {
    ...mapGetters('users', ['current']),
  },
});
</script>

<style>
</style>
