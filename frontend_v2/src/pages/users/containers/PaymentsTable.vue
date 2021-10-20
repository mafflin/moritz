<template>
  <div>Table?</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      headers: [
        {
          title: 'Booked at', align: 'left', value: 'bookedAt', width: '15%',
        },
        { title: 'Bank', value: 'bank' },
        { title: 'Type', value: 'transactionType' },
        { title: 'Details', value: 'details' },
        { title: 'Beneficiary', value: 'beneficiary' },
        { title: 'Notes', value: 'note', width: '10%' },
        { title: 'Cash', value: 'withdrawal', width: '10%' },
        { title: 'Debit', value: 'debit', width: '10%' },
        { title: 'Credit', value: 'credit', width: '10%' },
      ],
    };
  },
});
</script>
