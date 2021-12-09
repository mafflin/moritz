<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('groups.addNew') }}
    </h4>

    <div class="mdl-dialog__content">
      <group-form
        :group="group"
        :errors="errors"
        :colors="groupColors"
        @change="handleFieldChange"
        @submit="handleSubmit"
      />
    </div>

    <div
      class="mdl-dialog__actions"
    >
      <button
        class="mdl-button mdl-button--raised mdl-button--accent"
        @click="handleSubmit"
      >
        {{ $t('submit') }}
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
import GroupForm from '../components/GroupForm.vue';

export default {
  components: {
    GroupForm,
  },

  data() {
    return {
      group: {
        name: '',
        color: null,
      },
    };
  },

  computed: {
    ...mapGetters('settings', ['groupColors']),
    ...mapGetters('groups', ['errors']),
  },

  methods: {
    ...mapActions('groups', ['createSingle']),
    ...mapActions('users', ['closeUserModal']),

    handleFieldChange(attrs) {
      this.group = { ...this.group, ...attrs };
    },

    handleSubmit() {
      const { group, createSingle } = this;

      createSingle(group);
    },
  },
};
</script>
