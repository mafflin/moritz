<template>
  <div
    :class="{
      'mdl-cell mdl-shadow--2dp': true,
      'mdl-card': !reduced,
      'mdl-grid': reduced,
    }"
  >
    <div
      v-if="!reduced"
      class="mdl-card__title"
    >
      <h6 class="mdl-card__title-text">
        {{ $t('titles.payments') }}
      </h6>
      <span
        class="mdl-badge"
        :data-badge="total"
      />
    </div>

    <div
      :class="{
        'mdl-card__supporting-text mdl-card--expand': !reduced,
        'mdl-cell--10-col': reduced,
      }"
    >
      <div class="mdl-grid">
        <h6
          v-if="reduced"
          class="m-0 mdl-cell--12-col"
        >
          {{ $t('titles.payments') }}
          <span
            class="mdl-badge"
            :data-badge="total"
          />
        </h6>

        <p
          v-for="({ color, key, value }) in displayedAttributes"
          :key="key"
          :class="{
            'm-0': true,
            'mdl-cell--6-col': reduced,
            'mdl-cell--12-col': !reduced,
          }"
        >
          {{ $t(`payments.${key}`) }}:
          <span :class="color">{{ value }}</span>
        </p>
      </div>
    </div>

    <div
      :class="{
        'mdl-card__actions': !reduced,
        'mdl-cell--2-col': reduced
      }"
    >
      <file-upload-button
        :loading="loading"
        accept=".csv"
        icon="file_upload"
        colored
        @select="handleReportUpload"
      />
    </div>
  </div>
</template>

<script>
import { NUMERIC_PAYMENT_ATTRIBUTES } from '../../../utils/globals';
import FileUploadButton from '../../../components/FileUploadButton.vue';

export default {
  components: { FileUploadButton },

  props: {
    total: {
      type: Number,
      default: 0,
    },
    debit: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
    delta: {
      type: Number,
      default: 0,
    },
    withdrawal: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    reduced: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-report-upload',
  ],

  computed: {
    displayedAttributes() {
      return NUMERIC_PAYMENT_ATTRIBUTES
        .map((el) => ({ ...el, value: this[el.key] }));
    },
  },

  methods: {
    handleReportUpload(report) {
      this.$emit('on-report-upload', report);
    },
  },
};
</script>
