<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('info') }}
    </h4>

    <div class="mdl-dialog__content">
      <p
        v-for="[key, value] in attributes"
        :key="key"
      >
        <strong>{{ $t(`payments.${key}`) }}: </strong>
        <span>{{ value }}</span>
      </p>
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

import focusOnInput from '../../../mixins/focusOnInput';

export default {
  mixins: [focusOnInput],

  computed: {
    ...mapGetters('payments', { payment: 'selected' }),
    ...mapGetters('groups', { group: 'selected' }),

    attributes() {
      console.log(this.group);
      return Object.entries(this.payment)
        .filter(([, value]) => !!value);
    },
  },

  methods: {
    ...mapActions('users', ['closeUserModal']),
  },
};
</script>
