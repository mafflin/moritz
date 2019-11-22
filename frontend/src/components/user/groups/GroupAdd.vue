<template>
  <div class="mx-1">
    <v-form @submit.prevent="handleSubmit">
      <v-row align="center">
        <v-col cols="8" md="6">
          <v-text-field
            v-model="name"
            label="Group name"
            required
          />
        </v-col>

        <v-col cols="4" md="6">
          <v-btn
            @click="handleSubmit"
            :disabled="!name"
            color="purple"
            text
          >
            Add Group
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      name: null
    };
  },

  methods: {
    handleSubmit () {
      this.onSubmit(this.name)
    }
  }
};
</script>
