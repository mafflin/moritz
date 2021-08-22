<template>
  <v-row
    align="center"
    class="spacer"
    no-gutters
  >
    <v-col
      cols="4"
      sm="2"
      md="1"
    >
      <v-avatar size="64px">
        <v-img
          v-if="avatar"
          :src="avatar"
        />
        <v-icon
          v-else
          color="teal"
        >
          mdi-account-tie
        </v-icon>
      </v-avatar>
    </v-col>

    <v-col
      sm="5"
      md="3"
    >
      <strong>{{ name }}</strong>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
</style>
