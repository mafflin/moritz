<template>
  <dialog
    open
    class="mdl-dialog mdl-dialog--wide"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('titles.summary') }}
    </h4>

    <div class="mdl-dialog__content">
      <div ref="chartContainer" />

      <span
        v-for="{ color, id } in groups"
        :key="id"
        :ref="id"
        :class="`mdl-color--${color} hidden`"
      />
    </div>

    <div class="mdl-dialog__actions">
      <button
        ref="input"
        class="mdl-button"
        @click="closeUserModal"
      >
        {{ $t('close') }}
      </button>
    </div>
  </dialog>
</template>

<script>
import '@carbon/charts/styles.css';
import { mapActions, mapGetters } from 'vuex';
import { AreaChart } from '@carbon/charts';
import focusOnInput from '../../../mixins/focusOnInput';

const OPTIONS = {
  axes: {
    left: {
      mapsTo: 'debit',
      scaleType: 'linear',
    },
    bottom: {
      mapsTo: 'month',
      scaleType: 'time',
    },
  },
  curve: 'curveMonotoneX',
  height: '500px',
};

export default {
  mixins: [focusOnInput],

  data() {
    return {
      chart: null,
    };
  },

  computed: {
    ...mapGetters('summaries', ['list', 'filter']),
    ...mapGetters('groups', { groups: 'list' }),

    scale() {
      const { groups, $refs } = this;
      return groups.reduce((acc, { id, name }) => {
        const [element] = $refs[id];
        const color = getComputedStyle(element).backgroundColor;
        return { ...acc, [name]: color };
      }, {});
    },

    data() {
      return this.list.reduce((acc, { dataset, groupId }) => {
        const groupName = this.groups.find((group) => groupId === group.id)?.name;
        return [
          ...acc,
          ...dataset.map((data) => ({ ...data, group: groupName })),
        ];
      }, []);
    },
  },

  mounted() {
    this.drawChart();
  },

  unmounted() {
    this.destroyChart();
  },

  methods: {
    ...mapActions('users', ['closeUserModal']),

    drawChart() {
      const { data, scale, $refs: { chartContainer } } = this;
      const options = { ...OPTIONS, color: { scale } };
      this.chart = new AreaChart(chartContainer, { data, options });
    },

    destroyChart() {
      this.chart.components.forEach((component) => component.destroy());
    },
  },
};
</script>
