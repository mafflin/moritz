<template>
  <header class="mdl-layout__header">
    <i class="mdl-layout-icon material-icons">pets</i>

    <div class="mdl-layout__header-row">
      <span class="mdl-layout__title">
        {{ $t('titles.app') }}
      </span>

      <div class="mdl-layout-spacer" />

      <nav
        v-if="current"
        class="mdl-cell--hide-phone"
      >
        <search
          :q="q"
          @submit="fetchResults"
        />
      </nav>

      <nav
        v-if="current"
        class="mdl-navigation"
      >
        <router-link
          :to="{ name: 'Users' }"
          class="mdl-navigation__link"
        >
          <span>{{ $t('logout') }}</span>
        </router-link>
      </nav>

      <nav
        class="mdl-navigation"
      >
        <file-upload-button
          v-if="current"
          :image="current.avatar"
          :loading="loading"
          accept="image/*"
          icon="add_a_photo"
          small
          @select="handleImageUpdate"
        />

        <router-link
          v-else
          :to="{ name: 'Signup' }"
          class="mdl-button mdl-js-button mdl-button--icon mdl-button--fab mdl-button--colored"
        >
          <i class="material-icons">person_add</i>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FileUploadButton from '../components/FileUploadButton.vue';
import Search from '../components/Search.vue';

export default {
  components: {
    FileUploadButton,
    Search,
  },

  computed: {
    ...mapGetters(['loading']),
    ...mapGetters('users', ['current']),
    ...mapGetters('search', ['q']),
  },

  methods: {
    ...mapActions('users', ['updateCurrent']),
    ...mapActions('search', ['fetchResults']),

    handleImageUpdate(image) {
      this.updateCurrent({ image });
    },
  },
};
</script>

<style lang="css" scoped>
.mdl-layout-icon {
  font-size: 32px;
}
</style>
