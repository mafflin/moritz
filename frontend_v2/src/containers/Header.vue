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
        v-if="current"
        class="mdl-navigation"
      >
        <file-upload-button
          :image="current.avatar"
          :loading="loading"
          accept="image/*"
          icon="add_a_photo"
          small
          @select="handleImageUpdate"
        />
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
    ...mapGetters('settings', ['panelReduced']),
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
