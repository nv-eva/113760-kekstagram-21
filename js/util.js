'use strict';

(function () {
  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.key === `Enter`) {
        action();
      }
    }
  };
})();
