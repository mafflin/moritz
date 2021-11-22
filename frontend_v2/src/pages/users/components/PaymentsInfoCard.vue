<template>
  <div class="mdl-card mdl-cell mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">
        {{ $t('titles.payments') }}
      </h2>
      <span
        class="mdl-badge"
        :data-badge="total"
      />
    </div>

    <div class="mdl-card__supporting-text mdl-card--expand">
      <h6
        v-for="({ color, key, value }) in displayedAttributes"
        :key="key"
        class="m-0"
      >
        {{ $t(`payments.${key}`) }}:
        <span :class="color">{{ value }}</span>
      </h6>
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
import payment from '../../../utils/payment';
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
  },

  emits: [
    'on-report-upload',
  ],

  computed: {
    displayedAttributes() {
      return payment.numericAttributes
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
