const Utils = {
  Loading: {
    show: (target, options = {}) => {
      options.background = options.background || "rgba(255, 255, 255, 1)";
      options.fade = options.fade || true;
      if (target) $(target).LoadingOverlay("show", options);
      else $.LoadingOverlay("show", options);
    },

    hide: (target, force = false) => {
      if (target) $(target).LoadingOverlay("hide", force);
      else $.LoadingOverlay("hide", force);
    }
  }
};

export default Utils;
