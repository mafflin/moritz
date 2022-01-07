<template>
  <div class="mdl-grid">
    <div class="mdl-layout-spacer" />

    <div class="mdl-cell">
      <h4 class="mdl-dialog__title">
        {{ $t('signup') }}
      </h4>

      <div class="mdl-dialog__content">
        <form
          @submit.prevent="handleSubmit"
        >
          <div
            :class="{
              'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
              'is-invalid': errors.name,
              'is-dirty': name,
            }"
          >
            <input
              id="user-name"
              ref="input"
              v-model="name"
              class="mdl-textfield__input"
              type="text"
            >

            <label
              for="user-name"
              class="mdl-textfield__label"
            >
              {{ $t('users.name') }}

            </label>

            <span
              class="mdl-textfield__error"
              visibility="visibile"
            >
              {{ errors.name }}
            </span>
          </div>

          <div
            :class="{
              'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
              'is-invalid': errors.password,
              'is-dirty': password,
            }"
          >
            <input
              id="user-password"
              v-model="password"
              class="mdl-textfield__input"
              type="password"
            >

            <label
              for="user-password"
              class="mdl-textfield__label"
            >
              {{ $t('users.password') }}

            </label>

            <span
              class="mdl-textfield__error"
              visibility="visibile"
            >
              {{ errors.password }}
            </span>
          </div>

          <div
            :class="{
              'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
              'is-invalid': errors.passwordConfirmation,
              'is-dirty': passwordConfirmation,
            }"
          >
            <input
              id="user-password-confirmation"
              v-model="passwordConfirmation"
              class="mdl-textfield__input"
              type="password"
            >

            <label
              for="user-password-confirmation"
              class="mdl-textfield__label"
            >
              {{ $t('users.passwordConfirmation') }}
            </label>

            <span
              class="mdl-textfield__error"
              visibility="visibile"
            >
              {{ errors.passwordConfirmation }}
            </span>
          </div>

          <input
            class="hidden"
            type="submit"
            value="Submit"
          >
        </form>
      </div>

      <div class="mdl-dialog__actions">
        <button
          class="mdl-button mdl-button--raised mdl-button--accent"
          @click="handleSubmit"
        >
          {{ $t('submit') }}
        </button>

        <router-link
          :to="{ name: 'Signin' }"
          class="mdl-button"
        >
          {{ $t('signin') }}
        </router-link>
      </div>
    </div>

    <div class="mdl-layout-spacer" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      name: '',
      password: '',
      passwordConfirmation: '',
    };
  },

  computed: {
    ...mapGetters('users', ['errors']),
  },

  methods: {
    ...mapActions('users', ['createSingle', 'closeIndexModal']),

    handleSubmit() {
      const {
        name, password, passwordConfirmation, createSingle,
      } = this;

      createSingle({ name, password, passwordConfirmation });
    },
  },
};
</script>

<style scoped>
.mdl-button--icon {
  float: right;
}
</style>
