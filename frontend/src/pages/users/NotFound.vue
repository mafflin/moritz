<template>
  <div class="mdl-grid">
    <div class="mdl-layout-spacer" />

    <div class="mdl-cell">
      <div class="mdl-dialog__content">
        <i class="material-icons large">travel_explore</i>

        <p>
          {{ $t('notFound') }}
        </p>
      </div>

      <div class="mdl-dialog__actions">
        <router-link
          :to="{ name: 'Signin' }"
          class="mdl-button"
        >
          {{ $t('signin') }}
        </router-link>

        <div class="mdl-layout-spacer" />

        <router-link
          :to="{ name: 'Signup' }"
          class="mdl-button"
        >
          {{ $t('signup') }}
        </router-link>
      </div>
    </div>

    <div class="mdl-layout-spacer" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.mdl-dialog__content {
  text-align: center;
}

.large {
  font-size: 96px;
}
</style>
