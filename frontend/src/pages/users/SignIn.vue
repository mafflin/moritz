<template>
  <div class="mdl-grid">
    <div class="mdl-layout-spacer" />

    <div class="mdl-cell">
      <h4 class="mdl-dialog__title">
        {{ $t('signin') }}
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
            v-model="password"
            :label="$t('users.password')"
            :errors="errors.password"
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
import TextInput from '../../components/TextInput.vue';

export default {
  components: {
    TextInput,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed: {
    ...mapGetters('sessions', ['errors']),
  },

  methods: {
    ...mapActions('users', ['closeIndexModal']),
    ...mapActions('sessions', ['createCurrent']),

    handleSubmit() {
      const { email, password, createCurrent } = this;

      createCurrent({ email, password });
    },
  },
};
</script>

<style scoped>
.mdl-button--icon {
  float: right;
}
</style>
