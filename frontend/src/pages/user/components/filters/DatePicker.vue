<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        color="teal"
        :value="date"
        readonly
        v-on="on"
      />
    </template>
    <v-date-picker
      :value="date"
      type="month"
      color="teal"
      @input="handleChange"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',

  props: {
    onChange: {
      type: Function,
      required: true,
    },
    date: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      menu: false,
    };
  },

  methods: {
    handleChange(date) {
      this.menu = false;
      this.onChange(date);
    },
  },
};
</script>

<style scoped>
</style>
