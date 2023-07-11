<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('deleteHint') }}
    </h4>

    <div class="mdl-dialog__content">
      <p
        v-for="attr in attributes"
        :key="attr"
      >
        <strong>{{ $t(`payments.${attr}`) }}: </strong>
        <span>{{ selected[attr] }}</span>
      </p>
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
        {{ $t('cancel') }}
      </button>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('payments', ['selected']),

    attributes() {
      return Object.keys(this.selected)
        .filter((key) => !!this.selected[key]);
    },
  },

  methods: {
    ...mapActions('payments', ['deleteSingle']),
    ...mapActions('users', ['closeUserModal']),
  },
};
</script>
