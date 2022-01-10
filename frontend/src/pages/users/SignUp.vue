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
          <text-input
            v-model="email"
            :label="$t('users.email')"
            :errors="errors.email"
            type="email"
            focus
          />

          <text-input
            v-model="name"
            :label="$t('users.name')"
            :errors="errors.name"
          />

          <text-input
            v-model="password"
            :label="$t('users.password')"
            :errors="errors.password"
            type="password"
          />

          <text-input
            v-model="passwordConfirmation"
            :label="$t('users.passwordConfirmation')"
            :errors="errors.passwordConfirmation"
            type="password"
          />

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
import TextInput from '../../components/TextInput.vue';

export default {
  components: { TextInput },

  data() {
    return {
      email: '',
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
        email, name, password, passwordConfirmation, createSingle,
      } = this;

      createSingle({
        email, name, password, passwordConfirmation,
      });
    },
  },
};
</script>

<style scoped>
.mdl-button--icon {
  float: right;
}
</style>
