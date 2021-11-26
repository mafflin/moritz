<template>
  <transition name="slide">
    <div
      v-if="q"
      class="search-results mdl-shadow--6dp"
    >
      <div
        class="search-results--total p-4"
      >
        <span>{{ $t('payments.searchResults', { total }) }}</span>
      </div>

      <payments-table
        v-if="total"
        :header="false"
        :payments="results"
        :columns="columns"
        clickable
        @row-click="handleItemClick"
      />
    </div>
  </transition>
</template>

<script>
import PaymentsTable from './PaymentsTable.vue';

const COLUMNS = [
  { key: 'bookedAt' },
  { key: 'details', width: '60%' },
  { key: 'debit', numeric: true },
  { key: 'credit', numeric: true },
];

export default {
  components: {
    PaymentsTable,
  },

  props: {
    results: {
      type: Array,
      default: () => [],
    },
    q: {
      type: String,
      default: null,
    },
  },

  emits: [
    'search-item-click',
  ],

  computed: {
    columns() {
      return COLUMNS;
    },

    total() {
      return this.results.length;
    },
  },

  methods: {
    handleItemClick(payment) {
      this.$emit('search-item-click', payment);
    },
  },
};
</script>

<style scoped>
.search-results {
  top: 64px;
  right: 0;
  position: fixed;
  z-index: 10;
  width: 60%;
  max-width: 60%;
  max-height: 70%;
  overflow: auto;
}

.search-results--total {
  background-color: white;
  text-align: right;
}

.slide-enter-active {
  animation: slide-in .5s;
}

.slide-leave-active {
  animation: slide-in .5s reverse;
}

@keyframes slide-in {
  0% {
    top: -100px;
  }
  100% {
    top: 64px;
  }
}
</style>
