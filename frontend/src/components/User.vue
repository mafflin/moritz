<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "User",

  async mounted () {
    const { id } = this.$route.params;

    await this.fetchUser(id);
  },

  methods: {
    ...mapActions("users", ["fetchUser"]),
  }
};
</script>

<style scoped>
</style>
