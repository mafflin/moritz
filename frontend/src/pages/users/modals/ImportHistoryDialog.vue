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
        ref="input"
        class="mdl-button"
        @click="closeUserModal"
      >
        {{ $t('close') }}
      </button>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImportHistoryTable from '../components/ImportHistoryTable.vue';
import focusOnInput from '../../../mixins/focusOnInput';

export default {
  components: { ImportHistoryTable },

  mixins: [focusOnInput],

  computed: {
    ...mapGetters('imports', ['listSorted']),
    ...mapGetters('settings', ['importHistorySize']),
  },

  methods: {
    ...mapActions('users', ['closeUserModal']),
  },
};
</script>
