<template>
  <v-card>
    <v-card-text class="text-left">
      <v-row>
        <v-col cols="12">
          <v-chip label color="teal lighten-4">
            <span>
              Debit:
              <strong>{{ debit }}</strong>
            </span>
          </v-chip>

          <v-chip label color="teal lighten-4" class="mx-2">
            <span>
              credit:
              <strong>{{ credit }}</strong>
            </span>
          </v-chip>

          <v-chip label color="teal lighten-4" class="mx-2">
            <span>
              Payments:
              <strong>{{ total }}</strong>
            </span>
          </v-chip>

          <v-menu v-model="menu" :close-on-content-click="true" transition="scale-transition">
            <template v-slot:activator="{ on }">
              <v-chip label color="white">
                <v-text-field color="teal lighten-4" v-model="date" v-on="on" readonly />
              </v-chip>
            </template>
            <v-date-picker v-model="date" @input="handleDateChange" color="teal" />
          </v-menu>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="6">
          <groups-select :groups="groups" :onSelect="handleGroupChange" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GroupsSelect from "./GroupsSelect.vue";

export default {
  name: "PaymentsSummary",

  components: { GroupsSelect },

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      groupId: null,
      menu: false
    };
  },

  computed: {
    ...mapGetters("payments", ["total", "debit", "credit"]),
    ...mapGetters("groups", ["groups"])
  },

  methods: {
    ...mapActions("payments", ["fetchPayments"]),

    handleDateChange() {
      this.menu = false;
      this.fetch();
    },

    handleGroupChange(event) {
      this.groupId = event ? event.value : null;
      this.fetch();
    },

    fetch() {
      const { fetchPayments, date, groupId } = this;
      fetchPayments({ date, groupId });
    }
  }
};
</script>

<style scoped>
.in-chip input {
  color: white !important;
}
</style>
