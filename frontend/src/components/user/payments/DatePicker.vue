<template>
  <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition">
    <template v-slot:activator="{ on }">
      <v-chip label color="white">
        <v-text-field color="teal" :value="date" v-on="on" readonly />
      </v-chip>
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

  methods: {
    handleChange(date) {
      this.menu = false;
      this.onChange(`${date}-01`);
    }
  }
};
</script>

<style scoped>
.in-chip input {
  color: white !important;
}
</style>
