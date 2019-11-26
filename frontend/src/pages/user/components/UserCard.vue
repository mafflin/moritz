<template>
  <v-card>
    <v-img class="teal lighten-4 white--text align-end" height="200px" :src="user.avatar">
      <router-link
        active
        class="link"
        :to="{ name: 'User', id: user.id }"
        v-slot="{ navigate, isExactActive }"
      >
        <v-card-title @click="navigate">
          <v-icon v-if="!isExactActive" class="mr-4" color="white">mdi-keyboard-backspace</v-icon>
          {{ user.name }}
          <v-spacer />
          <v-icon class="ml-4" color="white">mdi-dots-horizontal</v-icon>
        </v-card-title>
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
  cursor: pointer;
  color: white;
  text-decoration: none;
}
</style>
