<template>
  <div
    :style="background"
    class="user-card-image mdl-card mdl-cell mdl-shadow--2dp"
  >
    <div class="mdl-card__title mdl-card--expand" />
    <div class="mdl-card__actions">
      <router-link
        :to="{ name: 'User', params: { id: user.id } }"
        class="user-card-image__name"
      >
        {{ user.name }}
      </router-link>
    </div>
  </div>
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

<style lang="scss" scoped>
.mdl-card__actions {
  background: rgba(0, 0, 0, 0.5);
}

.user-card-image__name {
  color: white;
  font-weight: 700;
  text-decoration: none;
}
</style>
