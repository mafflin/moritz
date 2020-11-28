<template>
  <v-dialog
    :value="true"
    max-width="400px"
    @input="goToHomePage"
  >
    <v-card>
      <v-card-title>Upload Photo?</v-card-title>

      <v-card-text class="text-left headline">
        <v-form @submit.prevent="handleSubmit">
          <v-row align="center">
            <v-col
              cols="12"
              md="12"
            >
              <v-file-input
                :value="file"
                show-size
                accept="image/*"
                label="Select photo"
                prepend-icon="mdi-camera"
                @change="setFile"
              />
            </v-col>
          </v-row>
        </v-form>
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
          :disabled="!file"
          color="teal"
          class="white--text"
          @click="uploadPhoto"
        >
          Upload Photo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProfileUpload',

  data() {
    return { file: null };
  },

  computed: {
    ...mapGetters('client', ['loading']),
  },

  methods: {
    ...mapActions('router', ['goToHomePage']),
    ...mapActions('users', ['updateUser']),

    setFile(file) {
      this.file = file;
    },

    uploadPhoto() {
      const { file, updateUser } = this;
      if (!this.file) return;

      updateUser({ file });
    },
  },
};
</script>

<style scoped>
</style>
