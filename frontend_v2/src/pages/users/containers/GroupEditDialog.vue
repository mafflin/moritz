<template>
  <dialog
    open
    class="mdl-dialog"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('groups.edit') }}
    </h4>

    <div class="mdl-dialog__content">
      <group-form
        :group="group"
        :errors="errors"
        :colors="groupColors"
        @change="handleFieldChange"
        @submit="handleSubmit"
      />
    </div>

    <div class="mdl-dialog__actions">
      <button
        type="button"
        class="mdl-button"
        @click="handleSubmit"
      >
        {{ $t('submit') }}
      </button>

      <router-link
        type="button"
        class="mdl-button close"
        :to="{ name: 'User' }"
      >
        {{ $t('cancel') }}
      </router-link>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GroupForm from '../components/GroupForm.vue';

export default {
  components: {
    GroupForm,
  },

  data() {
    return {
      group: {
        name: '',
        color: null,
      },
    };
  },

  computed: {
    ...mapGetters('settings', ['groupColors']),
    ...mapGetters('groups', ['selected', 'errors']),
  },

  created() {
    if (!this.selected) return;

    this.group = { ...this.selected };
  },

  methods: {
    ...mapActions('groups', ['updateSingle']),

    handleFieldChange(attrs) {
      this.group = { ...this.group, ...attrs };
    },

    handleSubmit() {
      const { group, updateSingle } = this;

      updateSingle(group);
    },
  },
};
</script>

<style lang="css" scoped>
.mdl-dialog {
  z-index: 100
}
</style>
