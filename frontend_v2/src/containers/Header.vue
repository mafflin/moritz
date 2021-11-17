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
        <img
          class="mdl-chip__contact ml-2"
          :src="current.avatar"
        >
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('users', ['current', 'loading']),
  },
};
</script>

<style lang="css" scoped>
.mdl-layout-icon {
  font-size: 32px;
}
</style>
