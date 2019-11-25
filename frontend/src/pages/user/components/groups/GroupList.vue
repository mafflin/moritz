<template>
  <div>
    <v-chip
      v-for="group in groups"
      :key="group.id"
      outlined
      color="teal"
      class="ma-1"
      close
      @click:close="() => deleteGroup(group.id)"
    >
      <router-link
        :to="{ name: 'Group', params: { groupId: group.id } }"
        class="link"
      >{{ group.name }}</router-link>
    </v-chip>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GroupList",

  props: {
    groups: {
      type: Array,
      required: true
    }
  },

  methods: {
    ...mapActions("groups", ["deleteGroup"])
  }
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: teal;
  text-decoration: none;
}
</style>
