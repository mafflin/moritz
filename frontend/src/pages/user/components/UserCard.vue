<template>
  <v-card>
    <router-link
      class="link"
      :to="{ name: 'TheMap' }"
    >
      <v-img
        class="teal lighten-4 white--text align-end"
        height="200px"
        :src="user.avatar"
      >
        <v-card-title>
          {{ user.name }}
          <v-spacer />

          <router-link
            class="link"
            :to="{ name: 'ProfileUpdate' }"
          >
            <v-icon
              class="ml-4"
              color="white"
            >
              mdi-dots-horizontal
            </v-icon>
          </router-link>
        </v-card-title>
      </v-img>
    </router-link>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: white;
  text-decoration: none;
}
</style>
