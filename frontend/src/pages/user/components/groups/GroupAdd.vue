<template>
  <div class="mx-1">
    <v-form @submit.prevent="handleSubmit">
      <v-row align="center">
        <v-col cols="8" md="6">
          <v-text-field v-model="name" label="Group name" required />
        </v-col>

        <v-col cols="4" md="6">
          <v-btn @click="handleSubmit" :disabled="!name" color="purple" text>Add Group</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    name: null
  }),

  methods: {
    ...mapActions("groups", ["createGroup", "changeNewGroup"]),

    handleSubmit() {
      this.createGroup({ name: this.name });
      this.name = null;
    }
  }
};
</script>
