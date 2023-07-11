<template>
  <dialog
    open
    class="mdl-dialog"
    @keydown.esc="closeUserModal"
  >
    <h4 class="mdl-dialog__title">
      {{ $t('titles.summary') }}

      <span class="right">
        <span
          v-for="option in displayOptions"
          :key="option"
          :class="{
            'mdl-chip vert-middle clickable ml-2': true,
            'mdl-color--accent': option === displayed,
          }"
          @click="handleDisplayOptionChange(option)"
        >
          <span class="mdl-chip__text">{{ $t(`payments.${option}`) }}</span>
        </span>

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
      <canvas
        ref="chart"
        class="canvas"
        width="600"
        height="600"
      />

      <span
        v-for="{ groupColor, groupId } in list"
        :key="groupId"
        :ref="groupId"
        :class="`mdl-color--${groupColor} hidden`"
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
import Chart from 'chart.js/auto';
import { mapActions, mapGetters } from 'vuex';
import focusOnInput from '../../../mixins/focusOnInput';

const CHART_TYPE = 'line';
const RANGE_OPTIONS = [3, 6, 12];
const DISPLAY_OPTIONS = ['debit', 'credit'];

export default {
  mixins: [focusOnInput],

  data() {
    const [displayed] = DISPLAY_OPTIONS;
    return {
      displayed,
      chart: null,
      rangeOptions: RANGE_OPTIONS,
      displayOptions: DISPLAY_OPTIONS,
    };
  },

  computed: {
    ...mapGetters('summaries', ['list', 'dateRange', 'filter']),

    labels() {
      return this.dateRange;
    },

    datasets() {
      const { list, displayed, $refs } = this;
      return list.map(({ groupName, groupId, dataset }) => {
        const [groupEl] = $refs[groupId];
        const color = getComputedStyle(groupEl).backgroundColor;
        return {
          borderColor: color,
          backgroundColor: color,
          label: groupName,
          data: dataset.map((item) => Math.abs(item[displayed])),
          tension: 0.1,
        };
      });
    },
  },

  watch: {
    labels(next, prev) {
      if (next.length === prev.length) return;

      this.updateChart();
    },
  },

  mounted() {
    this.drawChart();
  },

  unmounted() {
    this.chart.destroy();
  },

  methods: {
    ...mapActions('users', ['closeUserModal']),
    ...mapActions('summaries', ['filterList']),

    drawChart() {
      const canvas = this.$refs.chart.getContext('2d');
      const { labels, datasets } = this;

      this.chart = new Chart(canvas, {
        type: CHART_TYPE,
        data: { labels, datasets },
      });
    },

    updateChart() {
      this.chart.destroy();
      this.drawChart();
    },

    handleDisplayOptionChange(value) {
      if (this.displayed === value) return;

      this.displayed = value;
      this.updateChart();
    },
  },
};
</script>

<style scoped>
.canvas {
  max-height: 90%;
}

.vert-middle {
  vertical-align: middle;
}

.right {
  float: right;
}
</style>
