<template>
  <v-dialog
    :value="true"
    max-width="600px"
    @input="goToHomePage"
  >
    <v-card>
      <v-card-title>
        <v-icon left>
          mdi-google-keep
        </v-icon>
        <span>Add note</span>
      </v-card-title>

      <v-card-text class="text-left">
        <note-add
          :on-submit="updatePayment"
          :payment="selected"
          :loading="loading"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NoteAdd from '../../components/notes/NoteAdd.vue';

export default {
  name: 'Group',

  components: {
    NoteAdd,
  },

  computed: {
    ...mapGetters('payments', ['selected']),
    ...mapGetters('client', ['loading']),
  },

  methods: {
    ...mapActions('router', ['goToHomePage']),
    ...mapActions('payments', ['updatePayment']),
  },
};
</script>

<style scoped>
</style>
