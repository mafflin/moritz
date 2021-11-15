<template>
  <form @submit.prevent="$emit('submit')">
    <div :class="inputClassName">
      <input
        id="group-name"
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

    <div class="color-picker">
      <span
        v-for="color in colors"
        :key="color"
        :class="`mdl-chip__contact mdl-color--${color} mdl-color-text--white`"
        @click="$emit('change', { color })"
      >
        <i
          v-if="color === group.color"
          class="material-icons"
        >
          blur_circular
        </i>
      </span>
    </div>
  </form>
</template>

<script>
export default {
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

    inputClassName() {
      const { errors, groupName } = this;
      const invalid = errors.name ? 'is-invalid' : null;
      const dirty = groupName ? 'is-dirty' : null;
      return [
        'mdl-textfield',
        'mdl-js-textfield',
        'mdl-textfield--floating-label',
        dirty,
        invalid,
      ];
    },
  },

  mounted() {
    if (!this.group) return;

    this.groupName = this.group.name;
  },
};
</script>

<style lang="scss" scoped>
.material-icons {
  font-size: 32px;
}

.mdl-chip__contact {
  cursor: pointer;
  margin: 5px;
}

.color-picker {
  padding: 10px;
}
</style>
