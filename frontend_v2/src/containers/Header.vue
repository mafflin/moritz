<template>
  <header class="mdl-layout__header mdl-layout__header--scroll">
    <i class="mdl-layout-icon material-icons">pets</i>

    <div class="mdl-layout__header-row">
      <span class="mdl-layout__title">{{ $t('titles.app') }}</span>
      <div class="mdl-layout-spacer" />
      <nav
        v-if="current"
        class="mdl-navigation"
      >
        <router-link
          :to="{ name: 'users' }"
          class="mdl-navigation__link"
        >
          <span>{{ $t('logout') }}</span>
        </router-link>
      </nav>
      <nav
        v-if="current"
        class="mdl-navigation"
      >
        <router-link
          :to="{ name: 'user', params: { id: current.id } }"
        >
          <img
            class="mdl-chip__contact"
            :src="current.avatar"
          >
        </router-link>
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

<style lang="scss" scoped>
.mdl-layout-icon {
  font-size: 30px;
}

.mdl-chip__contact {
  margin-left: 10px;
}
</style>
