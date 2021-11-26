<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h6 class="mdl-card__title-text">
        {{ $t('titles.payments') }}
      </h6>
      <span
        class="mdl-badge"
        :data-badge="total"
      />
    </div>

    <div class="mdl-card__supporting-text mdl-card--expand">
      <div class="mdl-grid">
        <p
          v-for="({ key, value }) in attributes"
          :key="key"
          class="m-0 mdl-cell--12-col"
        >
          {{ $t(`payments.${key}`) }}:
          <strong>{{ value }}</strong>
        </p>
      </div>
    </div>

    <div class="mdl-card__actions">
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
import FileUploadButton from '../../../components/FileUploadButton.vue';

export const ATTRIBUTES = [
  'debit',
  'credit',
  'delta',
  'withdrawal',
];

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
  },

  emits: [
    'on-report-upload',
  ],

  computed: {
    attributes() {
      return ATTRIBUTES.map((key) => ({ key, value: this[key] }));
    },
  },

  methods: {
    handleReportUpload(report) {
      this.$emit('on-report-upload', report);
    },
  },
};
</script>
