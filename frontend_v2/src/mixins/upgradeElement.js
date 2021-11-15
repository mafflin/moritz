// Registers MDL elements that require JS.

export default {
  updated() {
    const { $el, upgradeElement } = this;

    if (!$el.querySelectorAll) return;

    $el.querySelectorAll("[class*='mdl-js']")
      .forEach((element) => upgradeElement(element));
  },

  methods: {
    upgradeElement(element) {
      if (!element) return;

      window.componentHandler.upgradeElement(element);
    },
  },
};
