<template>
  <v-dialog
    :value="true"
    max-width="400px"
    @input="goToHomePage"
  >
    <v-card>
      <v-card-title>Delete group?</v-card-title>
      <v-card-text class="text-left headline">
        {{ selected.name }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="teal"
          text
          @click="goToHomePage"
        >
          Cancel
        </v-btn>
        <v-btn
          color="teal"
          class="white--text"
          @click="deleteGroup"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('groups', ['selected']),
  },

  methods: {
    ...mapActions('router', ['goToHomePage']),
    ...mapActions('groups', ['deleteGroup']),
  },
};
</script>
