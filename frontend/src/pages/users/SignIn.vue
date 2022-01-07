<template>
  <div class="mdl-grid">
    <div class="mdl-layout-spacer" />

    <div class="mdl-cell">
      <h4 class="mdl-dialog__title">
        {{ $t('signin') }}
      </h4>

      <div class="mdl-dialog__content">
        <login-form
          :login="login"
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
          {{ $t('signin') }}
        </button>

        <router-link
          :to="{ name: 'Signup' }"
          class="mdl-button"
        >
          {{ $t('signup') }}
        </router-link>
      </div>
    </div>

    <div class="mdl-layout-spacer" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoginForm from './components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },

  data() {
    return {
      login: {
        name: '',
        password: '',
      },
    };
  },

  computed: {
    ...mapGetters('sessions', ['errors']),
  },

  methods: {
    ...mapActions('users', ['closeIndexModal']),
    ...mapActions('sessions', ['createCurrent']),

    handleFieldChange(attrs) {
      this.login = { ...this.login, ...attrs };
    },

    handleSubmit() {
      const { login, createCurrent } = this;

      createCurrent(login);
    },
  },
};
</script>

<style scoped>
.mdl-button--icon {
  float: right;
}
</style>
