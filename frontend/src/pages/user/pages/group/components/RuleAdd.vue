<template>
  <div class="mx-1">
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="match"
            label="Match"
            required
            autofocus
          />
        </v-col>

        <v-col
          cols="12"
          class="text-right"
        >
          <v-btn
            :disabled="loading || !match"
            type="submit"
            color="purple"
            text
          >
            Add Rule
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RuleAdd',

  props: {
    groupId: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      match: null,
    };
  },

  methods: {
    ...mapActions('rules', ['createRule']),

    handleSubmit() {
      const { match, groupId, createRule } = this;

      createRule({ match, groupId });
    },
  },
};
</script>
