<template>
  <div class="mx-1">
    <v-form @submit.prevent="createGroup">
      <v-row align="center">
        <v-col
          cols="8"
          md="6"
        >
          <v-text-field
            :value="newGroup.name"
            label="Group name"
            required
            autofocus
            @input="setNewGroup"
          />
        </v-col>

        <v-col
          cols="4"
          md="6"
        >
          <v-btn
            :disabled="!newGroup.name"
            color="purple"
            type="submit"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters('groups', ['newGroup']),
  },

  methods: {
    ...mapActions('groups', ['createGroup']),
    ...mapMutations('groups', ['setNewGroup']),
  },
};
</script>
