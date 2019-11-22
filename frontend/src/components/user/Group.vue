<template>
  <v-row dense>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-icon large left>mdi-cards</v-icon>
          <span class="title font-weight-light">{{ selected.name }}</span>
        </v-card-title>

        <v-card-text class="text-left">
          <rule-list />
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-icon large left>mdi-regex</v-icon>
          <span class="title font-weight-light">Add rule</span>
        </v-card-title>

        <v-card-text class="text--primary text-left">
          <rule-add :groupId="selected.id" :loading="loading" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import RuleAdd from "./rules/RuleAdd.vue";
import RuleList from "./rules/RuleList.vue";

export default {
  name: "Group",

  components: {
    RuleAdd,
    RuleList
  },

  computed: {
    ...mapGetters("groups", ["selected"]),
    ...mapGetters("client", ["loading"])
  }
};
</script>

<style scoped>
</style>
