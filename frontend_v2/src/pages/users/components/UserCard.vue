<template>
  <router-link :to="{ name: 'user', params: { id: user.id } }">
    <n-card :title="user.name">
      <template #cover>
        <img :src="user.avatar">
      </template>
    </n-card>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue';
import { NCard } from 'naive-ui';

export default defineComponent({
  components: {
    NCard,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
});
</script>
