export default {
  mounted() {
    const { input } = this.$refs;
    if (input) {
      input.focus();
    }
  },
};
