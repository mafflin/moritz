<template>
  <form @submit.prevent="$emit('submit')">
    <text-input
      v-model="name"
      :label="$t('groups.enterName')"
      :errors="errors.name"
      focus
    />

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

    <input
      class="hidden"
      type="submit"
      value="Submit"
    >
  </form>
</template>

<script>
import TextInput from '../../../components/TextInput.vue';
import focusOnInput from '../../../mixins/focusOnInput';

export default {
  components: { TextInput },
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
