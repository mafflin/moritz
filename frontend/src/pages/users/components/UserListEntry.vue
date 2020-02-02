<template>
  <v-expansion-panel hide-actions>
    <v-expansion-panel-header>
      <user-info
        :name="user.name"
        :avatar="user.avatar"
      />
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-divider />
      <v-card-text>{{ user.id }}</v-card-text>
      <v-card-actions>
        <v-btn
          :to="{ name: 'User', params: { userId: user.id } }"
          color="teal"
          primary
          dark
        >
          Log in
        </v-btn>
      </v-card-actions>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import UserInfo from './UserInfo.vue';

export default {
  name: 'UserListEntry',

  components: {
    UserInfo,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
