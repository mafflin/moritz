<template>
  <div>
    <v-chip
      v-for="rule in rules"
      :key="rule.id"
      outlined
      color="teal"
      class="ma-1"
      close
      @click:close="() => handleDeleteRule(rule.id)"
    >{{ rule.match }}
    </v-chip>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "RuleList",

  computed: {
    ...mapGetters("rules", ["rules"])
  },

  methods: {
    ...mapActions("rules", ["deleteRule"]),

    handleDeleteRule(id) {
      this.deleteRule(id);
    }
  }
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: black;
  text-decoration: none;
}
</style>
