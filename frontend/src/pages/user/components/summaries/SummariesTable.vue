<template>
  <v-data-table
    :headers="headers"
    sort-by="debit"
    must-sort
    :items="summaries"
    :items-per-page="-1"
    item-key="id"
  />
</template>

<script>
export default {
  name: 'SummariesTable',

  props: {
    summaries: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      headers: [
        { text: 'Group', value: 'groupName' },
        { text: 'Debit', value: 'debit' },
        { text: 'Credit', value: 'credit' },
      ],
    };
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>
