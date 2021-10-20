<template>
  <div />
</template>

<script>

import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  computed: {
    ...mapGetters('users', ['current', 'loading']),
  },
});
</script>
