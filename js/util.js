'use strict';

(function () {
  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.key === `Enter`) {
        action();
      }
    },

    isSpaceEvent: function (evt, action) {
      if (evt.code === `Space`) {
        action();
      }
    }
})();
