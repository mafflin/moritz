<template>
  <span>
    <i
      v-if="status === 'finished'"
      class="material-icons mdl-color-text--green"
    >
      check_circle_outline
    </i>

    <i
      v-if="status === 'failed'"
      class="material-icons mdl-color-text--red"
    >
      error
    </i>

    <i
      v-if="status === 'pending'"
      class="material-icons mdl-color-text--orange"
    >
      loop
    </i>
  </span>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
  },
};
</script>
