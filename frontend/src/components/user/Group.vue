<template>
  <v-row dense>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-icon large left>mdi-cards-club</v-icon>
          <span class="title font-weight-light">{{ selected.name }}</span>
        </v-card-title>

        <v-card-text class="text--primary text-left">{{ selected.id }}</v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-icon large left>mdi-regex</v-icon>
          <span class="title font-weight-light">Add rule</span>
        </v-card-title>

        <v-card-text>
          <rule-add :groupId="selected.id"/>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import RuleAdd from "./rules/RuleAdd.vue";

export default {
  name: "Group",

  components: {
    RuleAdd
  },

  computed: {
    ...mapGetters("groups", ["selected"])
  },
};
</script>

<style scoped>
</style>
