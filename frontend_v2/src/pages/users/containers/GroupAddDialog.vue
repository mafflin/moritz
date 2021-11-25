<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="$refs.close.click()"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('groups.addNew') }}
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

    <div
      class="mdl-dialog__actions"
    >
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
        <span ref="close">
          {{ $t('cancel') }}
        </span>
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
    ...mapGetters('groups', ['errors']),
  },

  methods: {
    ...mapActions('groups', ['createSingle']),

    handleFieldChange(attrs) {
      this.group = { ...this.group, ...attrs };
    },

    handleSubmit() {
      const { group, createSingle } = this;

      createSingle(group);
    },
  },
};
</script>
