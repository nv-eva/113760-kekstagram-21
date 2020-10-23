'use strict';

(function () {
  window.util = {
    isEscapeEvent: function (evt, action) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === `Enter`) {
        action();
      }
    }
  };
})();
