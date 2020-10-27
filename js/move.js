'use strict';

(function () {
  const imageUploadForm = document.querySelector(`.img-upload__form`);
  const effectLevelValue = imageUploadForm.querySelector(`.effect-level__value`);
  const effectLevelDepth = imageUploadForm.querySelector(`.effect-level__depth`);
  const effectLevelPin = imageUploadForm.querySelector(`.effect-level__pin`);

  const EFFECT_LEVEL_WIDTH = 453;

  window.move = {
    onMouseDown(evt, action) {
      evt.preventDefault();
      let startCoord = evt.clientX;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        const shift = startCoord - moveEvt.clientX;
        startCoord = moveEvt.clientX;

        let pinPosition = effectLevelPin.offsetLeft - shift;
        if (pinPosition >= EFFECT_LEVEL_WIDTH) {
          pinPosition = EFFECT_LEVEL_WIDTH;
        } else if (pinPosition < 0) {
          pinPosition = 0;
        }

        effectLevelDepth.style.width = pinPosition + `px`;
        effectLevelPin.style.left = pinPosition + `px`;
        effectLevelValue.value = Math.round(pinPosition * 100 / EFFECT_LEVEL_WIDTH);
        action();
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };

  window.move.imageUploadForm = imageUploadForm;
  window.move.effectLevelPin = effectLevelPin;
  window.move.effectLevelDepth = effectLevelDepth;
  window.move.effectLevelValue = effectLevelValue;
  window.move.EFFECT_LEVEL_WIDTH = EFFECT_LEVEL_WIDTH;
})();
