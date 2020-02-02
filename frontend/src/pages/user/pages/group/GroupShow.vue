<template>
  <v-dialog :value="true" @input="goToHomePage" max-width="600px">
    <v-card>
      <v-card-title>
        <v-icon left>mdi-google-circles-extended</v-icon>
        <span>{{ selected.name }}</span>
      </v-card-title>

      <v-card-text class="text-left">
        <rule-list class="my-4" />
        <v-divider />
        <div class="mt-4">Add a new rule</div>
        <rule-add :groupId="selected.id" :loading="loading" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RuleAdd from "./components/RuleAdd.vue";
import RuleList from "./components/RuleList.vue";

export default {
  name: "Group",

  components: {
    RuleAdd,
    RuleList
  },

  computed: {
    ...mapGetters("groups", ["selected"]),
    ...mapGetters("client", ["loading"])
  },

  methods: {
    ...mapActions("router", ["goToHomePage"]),
  }
};
</script>

<style scoped>
</style>
