<template>
  <div>
    <v-chip
      v-for="group in groups"
      :key="group.id"
      class="ma-2"
      color="deep-purple"
      text-color="white"
    >
      <span>
        <strong>{{ group.name }}:</strong>
        <span> {{ group.debit || 0 }}</span>
      </span>
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
  color: teal;
  text-decoration: none;
}
</style>
