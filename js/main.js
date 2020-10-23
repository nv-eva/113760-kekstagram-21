'use strict';

(function () {
  const body = document.querySelector(`body`);

  window.main = {
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
    },

    fixBody: function () {
      body.classList.add(`modal-open`);
    },

    unfixBody: function () {
      body.classList.remove(`modal-open`);
    }
  };
})();
