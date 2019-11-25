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
      @click="(event) => navigateToGroup(event, group.id)"
    >{{ group.name }}</v-chip>
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
    ...mapActions("groups", ["deleteGroup"]),
    ...mapActions("router", ["changeRoute"]),

    navigateToGroup(event, id) {
      event.stopPropagation();
      const { changeRoute } = this;
      changeRoute({ name: "Group", params: { groupId: id } });
    }
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
