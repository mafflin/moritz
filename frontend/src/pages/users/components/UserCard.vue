<template>
  <router-link
    :to="{ name: 'User', params: { id: user.id } }"
    :style="background"
    class="user-card-image mdl-card mdl-cell mdl-shadow--2dp"
  >
    <div class="mdl-card__title mdl-card--expand" />
    <div
      class="mdl-card__actions p-4"
    >
      <span
        class="user-card-image__name"
      >
        {{ user.name }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    background() {
      return `background: url('${this.user.avatar}') center / cover`;
    },
  },
};
</script>

<style lang="css" scoped>
.user-card-image {
  text-decoration: none;
}

.mdl-card__actions {
  background: rgba(0, 0, 0, 0.5);
}

.user-card-image__name {
  color: white;
  font-weight: 700;
  text-decoration: none;
}

.material-icons {
  vertical-align: middle;
}
</style>
