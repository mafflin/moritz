// Registers MDL elements that require JS.

export default {
  updated() {
    const { $el, upgradeElement } = this;
    const mdlJsElements = $el.querySelectorAll("[class*='mdl-js']");

    mdlJsElements.forEach((element) => upgradeElement(element));
  },

  methods: {
    upgradeElement(element) {
      if (!element) return;

      window.componentHandler.upgradeElement(element);
    },
  },
};
