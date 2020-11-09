'use strict';

const body = document.querySelector(`body`);

window.main = {
  isEscapeEvent(evt, action) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  },

  isEnterEvent(evt, action) {
    if (evt.key === `Enter`) {
      action();
    }
  },

  isRightEvent(evt, action) {
    if (evt.key === `ArrowRight`) {
      action();
    }
  },

  isLeftEvent(evt, action) {
    if (evt.key === `ArrowLeft`) {
      action();
    }
  },

  fixBody() {
    body.classList.add(`modal-open`);
  },

  unfixBody() {
    body.classList.remove(`modal-open`);
  }
};
