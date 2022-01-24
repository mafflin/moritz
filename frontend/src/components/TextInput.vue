<template>
  <div
    :class="{
      'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
      'is-invalid': errors,
      'is-dirty': isDirty,
    }"
  >
    <input
      :id="inputId"
      :ref="focus ? 'input' : null"
      v-model="input"
      class="mdl-textfield__input"
      :type="type"
    >

    <label
      for="inputId"
      class="mdl-textfield__label"
    >
      {{ label }}

    </label>

    <span
      class="mdl-textfield__error"
      visibility="visibile"
    >
      {{ errors }}
    </span>
  </div>
</template>

<script>
import focusOnInput from '../mixins/focusOnInput';

export default {
  mixins: [focusOnInput],

  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    errors: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    focus: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'update:modelValue',
  ],

  data() {
    return {
      inputId: `input-${this.label}-${Date.now()}`,
      value: '',
    };
  },

  computed: {
    input: {
      get() {
        return this.value;
      },

      set(name) {
        this.value = name;

        this.$emit('update:modelValue', name);
      },
    },

    isDirty() {
      return this.type === 'number' ? String(this.input) : this.input;
    },
  },

  updated() {
    if (this.modelValue === this.value) return;

    this.value = this.modelValue;
  },

  mounted() {
    if (!this.modelValue) return;

    this.value = this.modelValue;
  },
};
</script>

<style scoped>
.mdl-textfield {
  width: 100%;
}
</style>
