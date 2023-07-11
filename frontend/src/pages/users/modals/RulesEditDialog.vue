<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 :class="`mdl-dialog__title mdl-color-text--${selected.color}`">
      {{ selected.name }}

      <router-link
        type="button"
        class="mdl-button mdl-js-button mdl-button--icon"
        :to="{ name: 'EditGroup' }"
      >
        <i class="material-icons">
          edit
        </i>
      </router-link>

      <router-link
        type="button"
        class="mdl-button mdl-js-button mdl-button--icon"
        :to="{ name: 'DeleteGroup' }"
      >
        <i class="material-icons">
          delete
        </i>
      </router-link>
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
      <button
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
import RulesForm from '../components/RulesForm.vue';

export default {
  components: {
    RulesForm,
  },

  computed: {
    ...mapGetters('rules', ['list', 'errors']),
    ...mapGetters('groups', ['selected']),
  },

  methods: {
    ...mapActions('rules', ['createSingle', 'deleteSingle']),
    ...mapActions('users', ['closeUserModal']),
  },
};
</script>

<style scoped>
.mdl-button--icon {
  float: right;
}
</style>
