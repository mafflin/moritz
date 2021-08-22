<template>
  <v-card-title>
    Filters:
    <v-spacer />
    <date-picker
      :date="filter.date"
      :on-change="handleDateChange"
      class="ml-4"
    />
    <group-select
      :groups="groups"
      :selected="filter.groupId"
      :on-select="handleGroupChange"
      class="ml-4"
    />
  </v-card-title>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DatePicker from './DatePicker.vue';
import GroupSelect from './GroupSelect.vue';

export default {
  components: {
    DatePicker,
    GroupSelect,
  },

  computed: {
    ...mapGetters('payments', ['filter']),
    ...mapGetters('groups', ['groups']),
  },

  methods: {
    ...mapActions('payments', ['updateFilter']),

    handleDateChange(date) {
      this.updateFilter({ date });
    },

    handleGroupChange(groupId) {
      this.updateFilter({ groupId });
    },
  },
};
</script>

<style scoped>
</style>
