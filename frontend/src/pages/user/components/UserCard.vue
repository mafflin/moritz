<template>
  <v-card>
    <v-img
      class="teal lighten-4 white--text align-end"
      height="200px"
      :src="user.avatar"
    >
      <v-card-title>
        {{ user.name }}
        <v-spacer />
        <v-icon
          class="ml-4"
          color="white"
        >
          mdi-dots-horizontal
        </v-icon>
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',

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
