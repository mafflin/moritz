<template>
  <tr
    ref="row"
    :class="{ 'mdl-color--accent': payment.highlighted }"
  >
    <td
      v-for="({ key, numeric, hideOnPhone, hideOnTablet, width }) in columns"
      :key="key"
      :width="width"
      :class="{
        'mdl-data-table__cell': numeric,
        'mdl-cell--hide-phone': hideOnPhone,
        'mdl-cell--hide-tablet': hideOnTablet,
        'mdl-data-table__cell--non-numeric': !numeric,
      }"
    >
      {{ payment[key] }}
    </td>

    <td v-if="actions">
      <router-link
        type="button"
        class="mdl-button mdl-js-button mdl-button--icon"
        :to="{ name: 'EditPayment', params: { paymentId: payment.id } }"
      >
        <i class="material-icons mdl-color-text--blue-grey">
          note_alt
        </i>
      </router-link>
    </td>
  </tr>
</template>

<script>

export default {
  props: {
    payment: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array,
      required: true,
    },
    actions: {
      type: Boolean,
      default: false,
    },
  },

  updated() {
    const { payment: { highlighted }, $refs: { row } } = this;
    if (!highlighted) return;

    row.scrollIntoView({
      behaiviour: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  },
};
</script>

<style lang="css" scoped>
tr {
  scroll-margin-top: 120px;
}

td {
  white-space: normal;
}
</style>
