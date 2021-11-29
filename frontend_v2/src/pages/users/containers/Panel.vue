<template>
  <transition
    name="slide-in"
    mode="out-in"
  >
    <card-panel-reduced
      v-if="panelReduced"
      ref="low"
      :style="{'--height': '-88px'}"
    />
    <card-panel
      v-else
      ref="high"
      :style="{'--height': '-324px'}"
    />
  </transition>
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
.slide-in-enter-active {
  transition: all 0.5s ease;
}

.slide-in-leave-active {
  transition: all 0.5s ease;
}

.slide-in-leave-to,
.slide-in-enter-from {
  transform: translateY(var(--height));
}
</style>
