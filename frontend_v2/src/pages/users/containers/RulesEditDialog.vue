<template>
  <dialog
    open
    class="mdl-dialog"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('rules.manage') }}
    </h4>

    <div class="mdl-dialog__content">
      <rules-form
        :rules="list"
        :errors="errors"
        @submit="createSingle"
        @delete="deleteSingle"
      />
    </div>

    <div class="mdl-dialog__actions">
      <router-link
        type="button"
        class="mdl-button close"
        :to="{ name: 'User' }"
      >
        {{ $t('close') }}
      </router-link>
    </div>
  </dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RulesForm from '../components/RulesForm.vue';

export default {
  components: {
    RulesForm,
  },

  computed: {
    ...mapGetters('rules', ['list', 'errors']),
  },

  methods: {
    ...mapActions('rules', ['createSingle', 'deleteSingle']),
  },
};
</script>
