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
      <v-text-field color="teal" :value="date" v-on="on" readonly />
    </template>
    <v-date-picker :value="date" @input="handleChange" type="month" color="teal" />
  </v-menu>
</template>

<script>
export default {
  name: "DatePicker",

  props: {
    onChange: {
      type: Function,
      required: true
    },
    date: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      menu: false
    };
  },

  mounted() {
    if (this.date) return

    this.onChange(new Date().toISOString().substr(0, 10));
  },

  methods: {
    handleChange(date) {
      this.menu = false;
      this.onChange(`${date}-01`);
    }
  }
};
</script>

<style scoped>
</style>
