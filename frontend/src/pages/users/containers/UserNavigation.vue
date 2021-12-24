<template>
  <nav
    class="mdl-navigation"
  >
    <div
      class="mr-2"
    >
      <router-link
        :to="{ name: 'SummaryChart' }"
        class="mdl-button mdl-js-button mdl-button--icon"
      >
        <i class="material-icons">insights</i>
      </router-link>
    </div>
  </nav>

  <nav
    v-if="hasImports"
    class="mdl-navigation"
  >
    <div
      :class="{
        'mr-2': true,
        'mdl-color-text--accent spinning': hasPending,
      }"
    >
      <router-link
        :to="{ name: 'ImportHistory' }"
        class="mdl-button mdl-js-button mdl-button--icon"
      >
        <i class="material-icons">schedule</i>
      </router-link>
    </div>
  </nav>

  <nav class="mdl-cell--hide-phone">
    <search
      :q="q"
      @submit="fetchResults"
    />
  </nav>

  <nav class="mdl-navigation">
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
      :image="current.avatar"
      :loading="loading"
      accept="image/*"
      icon="add_a_photo"
      small
      @select="handleImageUpdate"
    />
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FileUploadButton from '../../../components/FileUploadButton.vue';
import Search from '../../../components/Search.vue';

export default {
  components: {
    FileUploadButton,
    Search,
  },

  computed: {
    ...mapGetters(['loading']),
    ...mapGetters('imports', ['hasImports', 'hasPending']),
    ...mapGetters('search', ['q']),
    ...mapGetters('users', ['current']),
  },

  methods: {
    ...mapActions('search', ['fetchResults']),
    ...mapActions('users', ['updateCurrent']),

    handleImageUpdate(image) {
      this.updateCurrent({ image });
    },
  },
};
</script>

<style lang="css" scoped>
.spinning {
  animation: spin-animation 2s infinite;
  animation-timing-function: linear;
}

@keyframes spin-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
