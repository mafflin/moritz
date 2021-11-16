<template>
  <form @submit.prevent="$emit('submit', match)">
    <div>
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

    <div :class="inputClassName">
      <input
        id="rule-match"
        v-model="match"
        class="mdl-textfield__input"
        type="text"
      >
      <label
        for="rule-match"
        class="mdl-textfield__label"
      >
        {{ $t('rules.match') }}
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
export default {
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

  computed: {
    inputClassName() {
      const { errors, match } = this;
      const invalid = errors.match ? 'is-invalid' : null;
      const dirty = match ? 'is-dirty' : null;
      return [
        'mdl-textfield',
        'mdl-js-textfield',
        'mdl-textfield--floating-label',
        dirty,
        invalid,
      ];
    },
  },
};
</script>
