<template>
  <div>
    <v-chip
      v-for="group in groups"
      :key="group.id"
      outlined
      color="teal lighten-4"
      class="ma-1"
      close
      @click:close="() => handleDeleteGroup(group.id)"
    >
      <router-link
        :to="{ name: 'Group', params: { groupId: group.id } }"
        class="link"
      >{{ group.name }}</router-link>
    </v-chip>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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

    handleDeleteGroup(id) {
      this.deleteGroup(id);
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
