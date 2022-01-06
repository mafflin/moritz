<template>
  <form
    @submit.prevent="$emit('submit')"
  >
    <div
      :class="{
        'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
        'is-invalid': errors.name,
        'is-dirty': nameLocal,
      }"
    >
      <input
        id="user-login"
        ref="input"
        v-model="name"
        class="mdl-textfield__input"
        type="text"
      >

      <label
        for="user-login"
        class="mdl-textfield__label"
      >
        {{ $t('login') }}

      </label>
    </div>

    <div
      :class="{
        'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
        'is-invalid': errors.password,
        'is-dirty': passwordLocal,
      }"
    >
      <input
        id="user-password"
        ref="input"
        v-model="password"
        class="mdl-textfield__input"
        type="password"
      >
      <span
        class="mdl-textfield__error"
        visibility="visibile"
      >
        {{ errors.name }}
      </span>

      <label
        for="user-password"
        class="mdl-textfield__label"
      >
        {{ $t('users.password') }}

      </label>
    </div>

    <input
      class="hidden"
      type="submit"
      value="Submit"
    >
  </form>
</template>

<script>
import focusOnInput from '../../../mixins/focusOnInput';

export default {
  mixins: [focusOnInput],

  props: {
    login: {
      type: Object,
      default: null,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: [
    'change',
    'submit',
  ],

  data() {
    return {
      nameLocal: '',
      passwordLocal: '',
    };
  },

  computed: {
    name: {
      get() {
        return this.nameLocal;
      },

      set(name) {
        this.nameLocal = name;

        this.$emit('change', { name });
      },
    },

    password: {
      get() {
        return this.passwordLocal;
      },

      set(password) {
        this.passwordLocal = password;

        this.$emit('change', { password });
      },
    },
  },

  mounted() {
    if (!this.user) return;

    this.nameLocal = this.user.name;
  },
};
</script>

<style scoped>
.mdl-textfield {
  width: 100%;
}
</style>
