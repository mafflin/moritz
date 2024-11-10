<template>
  <dialog
    open
    class="mdl-dialog mdl-dialog--wide"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('titles.summary') }}

      <span class="right">
        <span
          v-for="option in rangeOptions"
          :key="option"
          :class="{
            'mdl-chip vert-middle clickable ml-2': true,
            'mdl-color--accent': option === filter.range,
          }"
          @click="filterList({ range: option })"
        >
          <span class="mdl-chip__text">{{ option }}</span>
        </span>
      </span>
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
import { AreaChart } from '@carbon/charts';
import { mapActions, mapGetters } from 'vuex';
import focusOnInput from '../../../mixins/focusOnInput';
import { RANGE_OPTIONS } from '../../../store/summaries';

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
      rangeOptions: RANGE_OPTIONS,
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

  watch: {
    list() {
      this.updateChart();
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
    ...mapActions('summaries', ['filterList']),

    drawChart() {
      const { data, scale, $refs: { chartContainer } } = this;
      const options = { ...OPTIONS, color: { scale } };
      this.chart = new AreaChart(chartContainer, { data, options });
    },

    updateChart() {
      this.chart.model.setData(this.data);
    },

    destroyChart() {
      this.chart.components.forEach((component) => component.destroy());
    },
  },
};
</script>

<style scoped>
.vert-middle {
  vertical-align: middle;
}

.right {
  float: right;
}
</style>
