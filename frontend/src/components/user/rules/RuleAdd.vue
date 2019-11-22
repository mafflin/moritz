<template>
  <div class="mx-1">
    <v-form @submit.prevent="handleSubmit">
      <v-row align="center">
        <v-col cols="12">
          <v-text-field v-model="name" label="Rule name" required />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="match" label="Match" required />
        </v-col>

        <v-col cols="12">
          <v-btn
            :disabled="loading || !name || !match"
            type="submit"
            color="purple"
            text
          >Add Rule</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RuleAdd",

  props: {
    groupId: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      name: null,
      match: null
    };
  },

  methods: {
    ...mapActions("rules", ["createRule"]),

    handleSubmit() {
      const { name, match, groupId, createRule } = this;

      createRule({ name, match, groupId });
    }
  }
};
</script>
