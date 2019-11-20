<template>
  <div>
    <v-chip v-for="group in groups" :key="group.id" outlined class="ma-1">
      <router-link
        :to="{ name: 'Group', params: { groupId: group.id } }"
        class="link"
      >{{ group.name }}</router-link>
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "GroupList",

  props: {
    groups: {
      type: Array,
      required: true
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
