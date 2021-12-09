<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('imports.history', { importHistorySize }) }}
    </h4>

    <div class="mdl-dialog__content">
      <import-history-table
        :imports="listSorted"
      />
    </div>

    <div class="mdl-dialog__actions">
      <button
        class="mdl-button"
        @click="closeUserModal"
      >
        <span ref="close">
          {{ $t('close') }}
        </span>
      </button>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImportHistoryTable from '../components/ImportHistoryTable.vue';

export default {
  components: { ImportHistoryTable },

  computed: {
    ...mapGetters('imports', ['listSorted']),
    ...mapGetters('settings', ['importHistorySize']),
  },

  methods: {
    ...mapActions('users', ['closeUserModal']),
  },
};
</script>
