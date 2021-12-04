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
  </form>
</template>

<script>
import focusOnInput from '../../../mixins/focusOnInput';

export default {
  mixins: [focusOnInput],

  props: {
    user: {
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
