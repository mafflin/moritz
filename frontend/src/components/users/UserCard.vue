<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="user.avatar"
    >
      <v-card-title>{{ user.name }}</v-card-title>
    </v-img>

    <v-card-text class="text--primary text-left">
      <div>
        Cats are very good hunters and use their strong,
        sharp claws and teeth to grab and hold their prey.
        In the wild, cats feed on mice, birds and other small animals.
      </div>
      <div>
        Cats see and hear extremely well.
        They can see in the dark and hear many sounds that humans are not able to hear.
        To feel their way round, cats use their whiskers.
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Upload Report
      </v-btn>
    </v-card-actions>
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
</style>
