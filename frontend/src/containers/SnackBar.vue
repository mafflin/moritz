<template>
  <div
    ref="snackbar"
    :class="{
      'hidden': !hasMessage,
      'mdl-js-snackbar mdl-snackbar mdl-snackbar--active': hasMessage,
      'mdl-color--red': message.error,
      'mdl-color--green': message.t || message.tt,
    }"
    :timeout="5000"
  >
    <div
      class="mdl-snackbar__text"
    >
      <span v-if="message.t">{{ $t(message.t) }}</span>
      <span v-if="message.tt">{{ $t(...message.tt) }}</span>
      <span v-if="message.error">{{ message.error }}</span>
    </div>

    <button
      class="mdl-snackbar__action"
      type="button"
      @click="handleClose"
    >
      {{ $t('close') }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['message', 'hasMessage']),
  },

  methods: {
    ...mapMutations(['setMessage']),

    handleClose() {
      this.setMessage({});
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
