<template>
  <form @submit.prevent="$emit('submit')">
    <div
      :class="{
        'mdl-textfield mdl-js-textfield mdl-textfield--floating-label': true,
        'is-invalid': errors.name,
        'is-dirty': groupName,
      }"
    >
      <input
        id="group-name"
        ref="input"
        v-model="name"
        class="mdl-textfield__input"
        type="text"
      >
      <label
        for="group-name"
        class="mdl-textfield__label"
      >
        {{ $t('groups.enterName') }}
      </label>
      <span
        class="mdl-textfield__error"
        visibility="visibile"
      >
        {{ errors.name }}
      </span>
    </div>

    <div>
      <span
        v-for="color in colors"
        :key="color"
        :class="`mdl-chip__contact mdl-color--${color} mdl-color-text--white clickable m-1`"
        @click="$emit('change', { color })"
      >
        <i
          v-if="color === group.color"
          class="material-icons mdl-chip__contact m-0"
        >
          blur_circular
        </i>
      </span>
    </div>
  </form>
</template>

<script>
import focusOnInput from '../../../mixins/focusOnInput';

export default {
  mixins: [focusOnInput],

  props: {
    group: {
      type: Object,
      default: null,
    },
    colors: {
      type: Array,
      default: () => [],
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
      groupName: '',
    };
  },

  computed: {
    name: {
      get() {
        return this.groupName;
      },

      set(name) {
        this.groupName = name;

        this.$emit('change', { name });
      },
    },
  },

  mounted() {
    if (!this.group) return;

    this.groupName = this.group.name;
  },
};
</script>

<style scoped>
.mdl-textfield {
  width: 100%;
}
</style>
