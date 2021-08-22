<template>
  <div>
    <v-chip
      v-for="group in groups"
      :key="group.id"
      outlined
      color="teal"
      class="ma-1"
      close
      @click:close="() => navigateToDeleteGroup(group.id)"
      @click="(event) => navigateToGroup(event, group.id)"
    >
      {{ group.name }}
    </v-chip>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    groups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    ...mapActions('router', ['changeRoute']),

    navigateToGroup(event, id) {
      event.stopPropagation();
      this.changeRoute({ name: 'Group', params: { groupId: id } });
    },

    navigateToDeleteGroup(id) {
      this.changeRoute({ name: 'GroupDelete', params: { groupId: id } });
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: teal;
  text-decoration: none;
}
</style>
