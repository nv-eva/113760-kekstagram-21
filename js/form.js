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
  const uploadEffectLevel = window.move.imageUploadForm.querySelector(`.img-upload__effect-level`);

  const START_EFFECT_VALUE = 100;
  let effectValue = START_EFFECT_VALUE;

  const renderStartEffectLevel = function () {
    effectValue = START_EFFECT_VALUE;
    window.move.effectLevelValue.value = effectValue;
    window.move.effectLevelDepth.style.width = effectValue + `%`;
    window.move.effectLevelPin.style.left = effectValue + `%`;
  };

  const renderEffectValue = function (max, min) {
    return ((max + min) * effectValue * 0.01);
  };

  const removeAllImageEffects = function () {
    const effects = window.move.imageUploadForm.querySelectorAll(`input[type="radio"]`);
    effects.forEach((item, i) => {
      imageUploadPreview.classList.remove(`effects__preview--` + effects[i].value);
    });
    imageUploadPreview.style.filter = ``;
  };

  const effectsChangeHandler = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      renderStartEffectLevel();
      removeAllImageEffects();
      imageUploadPreview.classList.add(`effects__preview--` + evt.target.value);

      if (evt.target.value === `none`) {
        uploadEffectLevel.classList.add(`hidden`);
      } else {
        uploadEffectLevel.classList.remove(`hidden`);
      }
    }
  };

  const changeEffectValue = function () {
    effectValue = window.move.effectLevelValue.value;

    if (imageUploadPreview.classList.contains(`effects__preview--chrome`)) {
      imageUploadPreview.style.filter = `grayscale(` + renderEffectValue(1, 0) + `)`;
    } else if (imageUploadPreview.classList.contains(`effects__preview--sepia`)) {
      imageUploadPreview.style.filter = `sepia(` + renderEffectValue(1, 0) + `)`;
    } else if (imageUploadPreview.classList.contains(`effects__preview--marvin`)) {
      imageUploadPreview.style.filter = `invert(` + renderEffectValue(100, 0) + `%)`;
    } else if (imageUploadPreview.classList.contains(`effects__preview--phobos`)) {
      imageUploadPreview.style.filter = `blur(` + renderEffectValue(3, 0) + `px)`;
    } else if (imageUploadPreview.classList.contains(`effects__preview--heat`)) {
      imageUploadPreview.style.filter = `brightness(` + renderEffectValue(3, 1) + `)`;
    }
  };

  window.move.imageUploadForm.addEventListener(`change`, effectsChangeHandler);

  window.move.effectLevelPin.addEventListener(`mousedown`, function (evt) {
    window.move.onMouseDown(evt, changeEffectValue);
  });

  window.move.effectLevelPin.addEventListener(`keydown`, function (evt) {
    window.move.onArrowLeft(evt, changeEffectValue);
  });

  window.move.effectLevelPin.addEventListener(`keydown`, function (evt) {
    window.move.onArrowRight(evt, changeEffectValue);
  });


  // Валидирует хэштеги и комментарии
  const textHashtags = window.move.imageUploadForm.querySelector(`.text__hashtags`);
  const textDescription = window.move.imageUploadForm.querySelector(`.text__description`);
  const uploadSubmit = window.move.imageUploadForm.querySelector(`#upload-submit`);
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
