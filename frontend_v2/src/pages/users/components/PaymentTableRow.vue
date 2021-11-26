<template>
  <tr
    ref="row"
    :class="{ 'highlighted': payment.highlighted }"
  >
    <td
      v-for="({ key, numeric, width }) in columns"
      :key="key"
      :width="width"
      :class="{
        'mdl-data-table__cell': numeric,
        'mdl-data-table__cell--non-numeric': !numeric,
      }"
    >
      {{ payment[key] }}
    </td>

    <td v-if="actions">
      <router-link
        type="button"
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
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
.highlighted {
  background-color: skyblue;
}

td {
  white-space: normal;
}
</style>
