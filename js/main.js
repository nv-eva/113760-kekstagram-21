'use strict';

(function () {
  const body = document.querySelector(`body`);

  window.main = {
    getRandomIndex: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomElement: function (array) {
      return array[window.main.getRandomIndex(0, array.length)];
    },

    fixBody: function () {
      body.classList.add(`modal-open`);
    },

    unfixBody: function () {
      body.classList.remove(`modal-open`);
    }
  };
})();
