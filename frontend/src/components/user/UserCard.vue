<template>
  <v-card>
    <v-img class="white--text align-end" height="200px" :src="user.avatar">
      <router-link class="link" :to="{ name: 'User', id: user.id }">
        <v-card-title>{{ user.name }}</v-card-title>
      </router-link>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",

  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.link {
  color: white;
  text-decoration: none;
}
</style>
