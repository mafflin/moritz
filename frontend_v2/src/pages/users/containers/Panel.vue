<template>
  <div
    :class="{ 'sticky': panelReduced }"
  >
    <transition
      name="slide-in"
      mode="out-in"
    >
      <card-panel-reduced v-if="panelReduced" />
      <card-panel v-else />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardPanel from './CardPanel.vue';
import CardPanelReduced from './CardPanelReduced.vue';

export default {
  components: {
    CardPanel,
    CardPanelReduced,
  },

  computed: {
    ...mapGetters('settings', ['panelReduced']),
  },
};
</script>

<style scoped>
.sticky {
  width: 100%;
  top: 0;
  position: sticky;
  background-color: white;
  z-index: 8;
}

.slide-in-enter-active {
  transition: all 0.5s ease;
}

.slide-in-leave-active {
  transition: all 0.5s ease;
}

.slide-in-leave-to,
.slide-in-enter-from {
  transform: translateY(-320px);
}
</style>
