<template>
  <v-app-bar
    app
    dark
  >
    <v-toolbar-title>Moritz The Calculator</v-toolbar-title>
    <v-spacer />
    <v-btn
      :to="{ name: 'Users' }"
      color="teal"
      primary
      dark
    >
      Users
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>
