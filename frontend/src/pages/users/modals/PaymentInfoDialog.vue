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
        v-for="attr in attributes"
        :key="attr"
      >
        <strong>{{ $t(`payments.${attr}`) }}: </strong>
        <span>{{ selected[attr] }}</span>
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
    ...mapGetters('payments', ['selected']),

    attributes() {
      return Object.keys(this.selected)
        .filter((key) => !!this.selected[key]);
    },
  },

  methods: {
    ...mapActions('users', ['closeUserModal']),
  },
};
</script>
