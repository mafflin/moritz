<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeIndexModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('signup') }}
    </h4>

    <div class="mdl-dialog__content">
      <user-form
        :user="user"
        :errors="errors"
        @change="handleFieldChange"
        @submit="handleSubmit"
      />
    </div>

    <div class="mdl-dialog__actions">
      <button
        class="mdl-button mdl-button--raised mdl-button--accent"
        @click="handleSubmit"
      >
        {{ $t('submit') }}
      </button>

      <botton
        class="mdl-button"
        @click="closeIndexModal"
      >
        {{ $t('cancel') }}
      </botton>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserForm from '../components/UserForm.vue';

export default {
  components: {
    UserForm,
  },

  data() {
    return {
      user: {
        name: '',
      },
    };
  },

  computed: {
    ...mapGetters('users', ['errors']),
  },

  methods: {
    ...mapActions('users', ['createSingle', 'closeIndexModal']),

    handleFieldChange(attrs) {
      this.user = { ...this.user, ...attrs };
    },

    handleSubmit() {
      const { user, createSingle } = this;

      createSingle(user);
    },
  },
};
</script>

<style scoped>
.mdl-button--icon {
  float: right;
}
</style>
