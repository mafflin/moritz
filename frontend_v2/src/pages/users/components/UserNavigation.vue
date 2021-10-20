<template>
  <div>Navagation?</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      tabs: [
        { route: { name: 'user' }, text: 'Overview' },
        { route: { name: 'payments' }, text: 'Payments' },
      ],
    };
  },
});
</script>
