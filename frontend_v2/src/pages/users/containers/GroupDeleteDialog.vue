<template>
  <dialog
    open
    class="mdl-dialog"
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
        type="button"
        class="mdl-button mdl-color--red mdl-color-text--white"
        @click="deleteSingle"
      >
        {{ $t('delete') }}
      </button>

      <router-link
        type="button"
        class="mdl-button close"
        :to="{ name: 'User' }"
      >
        {{ $t('cancel') }}
      </router-link>
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
  },
};
</script>

<style lang="scss" scoped>
.mdl-dialog {
  z-index: 100
}
</style>
