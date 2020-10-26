'use strict';

(function () {
  // Показывает и скрывает окно загрузки фото
  const imageUpload = document.querySelector(`.img-upload`);
  const imageUploadOverlay = imageUpload.querySelector(`.img-upload__overlay`);
  const uploadOpenFile = imageUpload.querySelector(`#upload-file`);
  const uploadCancel = imageUpload.querySelector(`#upload-cancel`);

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`
      && document.activeElement !== textDescription
      && document.activeElement !== textHashtags) {
      evt.preventDefault();
      closeUpload();
    }
  };

  const openUpload = function () {
    imageUploadOverlay.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
    window.main.fixBody();
    // Прописывает загруженному превью изображения рамер 100%
    scaleValue = 1;
    renderScaleControlValue();
    renderImageScale();
    checkScaleControls();
    // Сбрасывает с превью изображения все эффекты
    renderStartEffectLevel();
    removeAllImageEffects();
    imageUploadPreview.classList.add(`effects__preview--none`);
    uploadEffectLevel.classList.add(`hidden`);
  };

  const closeUpload = function () {
    imageUploadOverlay.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    window.main.unfixBody();
    // Сбрасывает значения в форме
    uploadOpenFile.value = ``;
    textDescription.value = ``;
    textHashtags.value = ``;
  };

  uploadOpenFile.addEventListener(`change`, openUpload);

  uploadCancel.addEventListener(`click`, closeUpload);
  uploadCancel.addEventListener(`keydown`, function (evt) {
    window.main.isEnterEvent(evt, closeUpload);
  });


  // Редактирует размер изображения
  const scaleControlSmaller = imageUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = imageUpload.querySelector(`.scale__control--bigger`);
  const scaleControlValue = imageUpload.querySelector(`.scale__control--value`);
  const imageUploadPreview = imageUpload.querySelector(`.img-upload__preview img`);

  const MIN_SCALE = 25;
  const MAX_SCALE = 100;
  const SCALE_STEP = 25;
  let scaleStep = SCALE_STEP * 0.01;
  let scaleValue = 1;

  const renderScaleControlValue = function () {
    scaleControlValue.value = (scaleValue) * 100 + `%`;
  };

  const renderImageScale = function () {
    imageUploadPreview.style.transform = `scale(` + scaleValue + `)`;
  };

  const checkScaleControls = function () {
    if (scaleValue <= MIN_SCALE * 0.01) {
      scaleControlSmaller.disabled = true;
      scaleControlSmaller.classList.add(`scale__control--disabled`);
    } else {
      scaleControlSmaller.disabled = false;
      scaleControlSmaller.classList.remove(`scale__control--disabled`);
    }

    if (scaleValue >= MAX_SCALE * 0.01) {
      scaleControlBigger.disabled = true;
      scaleControlBigger.classList.add(`scale__control--disabled`);
    } else {
      scaleControlBigger.disabled = false;
      scaleControlBigger.classList.remove(`scale__control--disabled`);
    }
  };

  const makeScaleSmaller = function () {
    if (scaleValue - scaleStep >= MIN_SCALE * 0.01) {
      scaleValue -= scaleStep;
      renderScaleControlValue();
      renderImageScale();
      checkScaleControls();
    }
  };

  const makeScaleBigger = function () {
    if (scaleValue + scaleStep <= MAX_SCALE * 0.01) {
      scaleValue += scaleStep;
      renderScaleControlValue();
      renderImageScale();
      checkScaleControls();
    }
  };

  scaleControlSmaller.addEventListener(`click`, makeScaleSmaller);
  scaleControlValue.addEventListener(`keydown`, function (evt) {
    window.main.isLeftEvent(evt, makeScaleSmaller);
  });

  scaleControlBigger.addEventListener(`click`, makeScaleBigger);
  scaleControlValue.addEventListener(`keydown`, function (evt) {
    window.main.isRightEvent(evt, makeScaleBigger);
  });


  // Применяет эффекты к изображению
  const imageUploadForm = document.querySelector(`.img-upload__form`);
  const uploadEffectLevel = imageUploadForm.querySelector(`.img-upload__effect-level`);
  const effectLevelValue = imageUploadForm.querySelector(`.effect-level__value`);
  const effectLevelDepth = imageUploadForm.querySelector(`.effect-level__depth`);
  const effectLevelPin = imageUploadForm.querySelector(`.effect-level__pin`);

  const EFFECT_LEVEL_WIDTH = 453;
  const START_EFFECT_VALUE = 100;
  let effectValue = START_EFFECT_VALUE;

  const renderStartEffectLevel = function () {
    effectValue = START_EFFECT_VALUE;
    effectLevelValue.value = START_EFFECT_VALUE;
    effectLevelDepth.style.width = EFFECT_LEVEL_WIDTH + `px`;
    effectLevelPin.style.left = EFFECT_LEVEL_WIDTH + `px`;
  };

  const renderEffectValue = function (max, min) {
    return ((max + min) * effectValue * 0.01);
  };

  const removeAllImageEffects = function () {
    const effects = imageUploadForm.querySelectorAll(`input[type="radio"]`);
    effects.forEach((item, i) => {
      imageUploadPreview.classList.remove(`effects__preview--` + effects[i].value);
    });
    imageUploadPreview.style.filter = ``;
  };

  const effectsChangeHandler = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      let effect = evt.target.value;
      renderStartEffectLevel();
      removeAllImageEffects();
      imageUploadPreview.classList.add(`effects__preview--` + effect);

      if (effect === `none`) {
        uploadEffectLevel.classList.add(`hidden`);
      } else {
        uploadEffectLevel.classList.remove(`hidden`);
      }

      effectLevelPin.addEventListener(`mousedown`, function () {
        evt.preventDefault();

        removeAllImageEffects();

        let startCoord = evt.clientX;

        const onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          const shift = startCoord - moveEvt.clientX;
          startCoord = moveEvt.clientX;

          let pinPosition = effectLevelPin.offsetLeft - shift;
          if (pinPosition < 0 || pinPosition > EFFECT_LEVEL_WIDTH) {
            shift = 0;
          }

          effectLevelDepth.style.width = pinPosition + `px`;
          effectLevelPin.style.left = pinPosition + `px`;
          effectLevelValue.value = Math.round(pinPosition * 100 / EFFECT_LEVEL_WIDTH);
          effectValue = effectLevelValue.value;

          if (effect === `chrome`) {
            imageUploadPreview.style.filter = `grayscale(` + renderEffectValue(1, 0) + `)`;
          } else if (effect === `sepia`) {
            imageUploadPreview.style.filter = `sepia(` + renderEffectValue(1, 0) + `)`;
          } else if (effect === `marvin`) {
            imageUploadPreview.style.filter = `invert(` + renderEffectValue(100, 0) + `%)`;
          } else if (effect === `phobos`) {
            imageUploadPreview.style.filter = `blur(` + renderEffectValue(3, 0) + `px)`;
          } else if (effect === `heat`) {
            imageUploadPreview.style.filter = `brightness(` + renderEffectValue(3, 1) + `)`;
          }
        };

        const onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);
        };

        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);
      });
    }
  };

  imageUploadForm.addEventListener(`change`, effectsChangeHandler);


  // Валидирует хэштеги и комментарии
  const textHashtags = imageUploadForm.querySelector(`.text__hashtags`);
  const textDescription = imageUploadForm.querySelector(`.text__description`);
  const uploadSubmit = imageUploadForm.querySelector(`#upload-submit`);
  const MAX_HASHTAGS_COUNT = 5;
  const MAX_DESCRIPTION_LENGTH = 140;

  const validationHashtags = function () {
    const hashtags = textHashtags.value.split(` `);
    const regularHashtag = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;

    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      textHashtags.setCustomValidity(`Используйте не более ` + MAX_HASHTAGS_COUNT + ` хэш-тегов`);
    } else if ((new Set(hashtags)).size < hashtags.length) {
      textHashtags.setCustomValidity(`Хэш-теги не должны повторяться`);
    } else {
      hashtags.forEach((item, i) => {
        if (!regularHashtag.test(hashtags[i]) && textHashtags.value !== ``) {
          textHashtags.setCustomValidity(`Введите корректный хэш-тег`);
        } else {
          textHashtags.setCustomValidity(``);
        }
      });
    }

    textHashtags.reportValidity();
  };

  textHashtags.addEventListener(`input`, validationHashtags);
  uploadSubmit.addEventListener(`click`, validationHashtags);
  uploadSubmit.addEventListener(`keydown`, function (evt) {
    window.main.isEnterEvent(evt, validationHashtags);
  });

  textDescription.addEventListener(`input`, function () {
    const descriptionLength = textDescription.value.length;

    if (descriptionLength > MAX_DESCRIPTION_LENGTH) {
      textDescription.setCustomValidity(`Сообщение слишком длинное. Удалите лишние ` + (descriptionLength - MAX_DESCRIPTION_LENGTH) + ` симв.`);
    } else {
      textDescription.setCustomValidity(``);
    }

    textDescription.reportValidity();
  });
})();
