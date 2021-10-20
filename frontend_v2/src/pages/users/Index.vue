<template>
  <n-grid
    x-gap="12"
    :cols="list.length"
  >
    <n-gi
      v-for="user in list"
      :key="user.id"
    >
      <user-card
        :user="user"
      />
    </n-gi>
  </n-grid>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import { NGrid, NGi } from 'naive-ui';
import UserCard from './components/UserCard.vue';

export default defineComponent({
  components: {
    NGi,
    NGrid,
    UserCard,
  },

  computed: {
    ...mapGetters('users', ['list', 'isLoading']),
  },
});
</script>
