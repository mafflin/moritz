<template>
  <div
    :class="{
      'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
      'is-invalid': errors,
      'is-dirty': input,
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
    value: {
      type: String,
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
      inputId: `input-${Date.now()}`,
      valueLocal: '',
    };
  },

  computed: {
    input: {
      get() {
        return this.valueLocal;
      },

      set(name) {
        this.valueLocal = name;

        this.$emit('update:modelValue', name);
      },
    },
  },

  mounted() {
    if (!this.value) return;

    this.valueLocal = this.value;
  },
};
</script>

<style scoped>
.mdl-textfield {
  width: 100%;
}
</style>
