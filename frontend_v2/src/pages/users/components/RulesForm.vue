<template>
  <form @submit.prevent="handleSubmit">
    <div class="my-4">
      <span
        v-for="rule in rules"
        :key="rule.match"
        class="mdl-chip mdl-chip--deletable mr-1"
      >
        <span class="mdl-chip__text">{{ rule.match }}</span>
        <button
          type="button"
          class="mdl-chip__action"
          @click="$emit('delete', rule.id)"
        >
          <i class="material-icons">cancel</i>
        </button>
      </span>
    </div>

    <div
      :class="{
        'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
        'is-invalid': errors.match,
        'is-dirty': match,
      }"
    >
      <input
        id="rule-match"
        ref="input"
        v-model="match"
        class="mdl-textfield__input"
        type="text"
      >

      <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
      >
        <i class="material-icons">
          add_circle_outline
        </i>
      </button>

      <label
        for="rule-match"
        class="mdl-textfield__label"
      >
        {{ $t('rules.add') }}
      </label>

      <span
        class="mdl-textfield__error"
        visibility="visibile"
      >
        {{ errors.match }}
      </span>
    </div>
  </form>
</template>

<script>
import focusOnInput from '../../../mixins/focusOnInput';

export default {
  mixins: [focusOnInput],

  props: {
    rules: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: [
    'submit',
    'delete',
  ],

  data() {
    return {
      match: '',
    };
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', this.match);
    },
  },
};
</script>

<style scoped>
.mdl-textfield {
  width: 100%;
}

.mdl-button {
  right: 0;
}
</style>
