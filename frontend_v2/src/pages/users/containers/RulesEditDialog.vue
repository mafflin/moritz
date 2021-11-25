<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="$refs.close.click()"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('rules.manage') }}

      <group-chip
        class="group-chip"
        :group="selected"
      />
    </h4>

    <div class="mdl-dialog__content">
      <rules-form
        :rules="list"
        :errors="errors"
        @submit="createSingle"
        @delete="deleteSingle"
      />
    </div>

    <div class="mdl-dialog__actions">
      <router-link
        type="button"
        class="mdl-button close"
        :to="{ name: 'User' }"
      >
        <span ref="close">
          {{ $t('close') }}
        </span>
      </router-link>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GroupChip from '../components/GroupChip.vue';
import RulesForm from '../components/RulesForm.vue';

export default {
  components: {
    GroupChip,
    RulesForm,
  },

  computed: {
    ...mapGetters('rules', ['list', 'errors']),
    ...mapGetters('groups', ['selected']),
  },

  methods: {
    ...mapActions('rules', ['createSingle', 'deleteSingle']),
  },
};
</script>

<style scoped>
.group-chip {
  vertical-align: middle;
}
</style>
