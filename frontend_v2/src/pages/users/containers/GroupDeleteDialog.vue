<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('groups.deleteHint') }}
    </h4>

    <div class="mdl-dialog__content">
      <group-chip
        :group="selected"
      />
    </div>

    <div class="mdl-dialog__actions">
      <button
        class="mdl-button mdl-color--red mdl-color-text--white"
        @click="deleteSingle"
      >
        {{ $t('delete') }}
      </button>

      <button
        class="mdl-button"
        @click="closeUserModal"
      >
        <span ref="close">
          {{ $t('cancel') }}
        </span>
      </button>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GroupChip from '../components/GroupChip.vue';

export default {
  components: { GroupChip },

  computed: {
    ...mapGetters('groups', ['selected']),
  },

  methods: {
    ...mapActions('groups', ['deleteSingle']),
    ...mapActions('users', ['closeUserModal']),
  },
};
</script>
