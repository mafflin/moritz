<template>
  <form @submit.prevent="handleSubmit">
    <div
      v-if="expanded"
      class="my-4"
    >
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
      v-if="!expanded && rules.length"
      class="expand-text clickable my-4"
      @click="handleExpandButtonClick"
    >
      {{ $t('rules.showHidden', { total: rules.length }) }}
    </div>

    <expand-button
      v-if="rules.length"
      :expanded="expanded"
      @toggle="handleExpandButtonClick"
    />

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
        class="mdl-button mdl-js-button mdl-button--icon"
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
import ExpandButton from './ExpandButton.vue';

export default {
  components: { ExpandButton },

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
      expanded: true,
    };
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', this.match);
    },

    handleExpandButtonClick() {
      this.expanded = !this.expanded;
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

.expand-text {
  text-align: center;
}
</style>
