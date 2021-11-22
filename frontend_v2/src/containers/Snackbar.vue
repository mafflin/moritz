<template>
  <div
    ref="snackbar"
    :class="{
      'mdl-js-snackbar': true ,
      'mdl-snackbar mdl-snackbar--active': hasMessage,
      'mdl-color--red': message.error,
    }"
    :timeout="5000"
  >
    <div
      class="mdl-snackbar__text"
    >
      <span v-if="message.t">{{ $t(message.t) }}</span>
      <span v-if="message.error">{{ message.error }}</span>
    </div>
    <button
      class="mdl-snackbar__action"
      type="button"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('settings', ['message', 'hasMessage']),
  },
};
</script>
