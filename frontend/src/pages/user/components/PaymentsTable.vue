<template>
  <v-data-table
    :headers="headers"
    :items="payments"
    :items-per-page="-1"
    item-key="id"
    must-sort
  >
    <template #[`item.note`]="{ item }">
      <span>
        {{ item.note }}
        <router-link
          class="link"
          :to="{ name: 'Notes', params: { paymentId: item.id } }"
        >
          <v-icon class="ml-1">mdi-pencil-outline</v-icon>
        </router-link>
      </span>
    </template>
    <template #[`item.withdrawal`]="{ item }">
      <span>
        <span v-if="item.withdrawal">{{ item.withdrawal }}</span>
        <router-link
          class="link"
          :to="{ name: 'Withdrawals', params: { paymentId: item.id } }"
        >
          <v-icon class="ml-1">mdi-cash</v-icon>
        </router-link>
      </span>
    </template>
    <template #[`item.debit`]="{ item }">
      <v-chip color="teal lighten-4">
        {{ item.debit.toFixed(2) }}
      </v-chip>
    </template>
    <template #[`item.credit`]="{ item }">
      <v-chip color="indigo lighten-4">
        {{ item.credit.toFixed(2) }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'Payments',

  props: {
    payments: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      headers: [
        {
          text: 'Booked at', align: 'left', value: 'bookedAt', width: '15%',
        },
        { text: 'Type', value: 'transactionType' },
        { text: 'Details', value: 'details' },
        { text: 'Beneficiary', value: 'beneficiary' },
        { text: 'Notes', value: 'note', width: '10%' },
        { text: 'Cash', value: 'withdrawal', width: '10%' },
        { text: 'Debit', value: 'debit', width: '10%' },
        { text: 'Credit', value: 'credit', width: '10%' },
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
