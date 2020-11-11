'use strict';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const START_EFFECT_VALUE = 100;
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

// Показывает и скрывает окно загрузки фото
const imageUpload = document.querySelector(`.img-upload`);
const imageUploadOverlay = imageUpload.querySelector(`.img-upload__overlay`);
const uploadOpenFile = imageUpload.querySelector(`#upload-file`);
const uploadCancel = imageUpload.querySelector(`#upload-cancel`);

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`
    && document.activeElement !== textDescription
    && document.activeElement !== textHashtags) {
    evt.preventDefault();
    onUploadCancelClick();
  }
};

const onFileLoad = () => {
  imageUploadOverlay.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  window.main.fixBody();
  // Возвращает размер изображения к 100%
  scaleValue = 1;
  renderScaleControlValue();
  renderImageScale();
  checkScaleControls();
  // Сбрасывает с превью изображения все эффекты
  renderStartEffectLevel();
  removeAllImageEffects();
  imageUpload.querySelector(`[name=effect]`).checked = `none`;
  imageUploadPreview.classList.add(`effects__preview--none`);
  uploadEffectLevel.classList.add(`hidden`);
};

const onUploadCancelClick = () => {
  imageUploadOverlay.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  window.main.unfixBody();
  // Сбрасывает значения в форме
  uploadOpenFile.value = ``;
  textDescription.value = ``;
  textHashtags.value = ``;
};

uploadOpenFile.addEventListener(`change`, onFileLoad);

uploadCancel.addEventListener(`click`, onUploadCancelClick);
uploadCancel.addEventListener(`keydown`, function (evt) {
  window.main.isEnterEvent(evt, onUploadCancelClick);
});


// Редактирует размер изображения
const scaleControlSmaller = imageUpload.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imageUpload.querySelector(`.scale__control--bigger`);
const scaleControlValue = imageUpload.querySelector(`.scale__control--value`);
const imageUploadPreview = imageUpload.querySelector(`.img-upload__preview img`);

let scaleStep = SCALE_STEP * 0.01;
let scaleValue = 1;

const renderScaleControlValue = () => {
  scaleControlValue.value = (scaleValue) * 100 + `%`;
};

const renderImageScale = () => {
  imageUploadPreview.style.transform = `scale(${scaleValue})`;
};

const checkScaleControls = () => {
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

const onScaleControlSmallerClick = () => {
  if (scaleValue - scaleStep >= MIN_SCALE * 0.01) {
    scaleValue -= scaleStep;
    renderScaleControlValue();
    renderImageScale();
    checkScaleControls();
  }
};

const onScaleControlBiggerClick = () => {
  if (scaleValue + scaleStep <= MAX_SCALE * 0.01) {
    scaleValue += scaleStep;
    renderScaleControlValue();
    renderImageScale();
    checkScaleControls();
  }
};

scaleControlSmaller.addEventListener(`click`, onScaleControlSmallerClick);
scaleControlValue.addEventListener(`keydown`, function (evt) {
  window.main.isLeftEvent(evt, onScaleControlSmallerClick);
});

scaleControlBigger.addEventListener(`click`, onScaleControlBiggerClick);
scaleControlValue.addEventListener(`keydown`, function (evt) {
  window.main.isRightEvent(evt, onScaleControlBiggerClick);
});


// Применяет эффекты к изображению
const uploadEffectLevel = window.move.imageUploadForm.querySelector(`.img-upload__effect-level`);

let effectValue = START_EFFECT_VALUE;

const renderStartEffectLevel = () => {
  effectValue = START_EFFECT_VALUE;
  window.move.effectLevelValue.value = effectValue;
  window.move.effectLevelDepth.style.width = effectValue + `%`;
  window.move.effectLevelPin.style.left = effectValue + `%`;
};

const removeAllImageEffects = () => {
  const effects = window.move.imageUploadForm.querySelectorAll(`input[type="radio"]`);
  effects.forEach((item, i) => {
    imageUploadPreview.classList.remove(`effects__preview--${effects[i].value}`);
  });
  imageUploadPreview.style.filter = ``;
};

const effectsChangeHandler = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    renderStartEffectLevel();
    removeAllImageEffects();
    imageUploadPreview.classList.add(`effects__preview--${evt.target.value}`);

    if (evt.target.value === `none`) {
      uploadEffectLevel.classList.add(`hidden`);
    } else {
      uploadEffectLevel.classList.remove(`hidden`);
    }
  }
};

const changeEffectValue = () => {
  effectValue = window.move.effectLevelValue.value;

  if (imageUploadPreview.classList.contains(`effects__preview--chrome`)) {
    imageUploadPreview.style.filter = `grayscale(${effectValue * 0.01})`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--sepia`)) {
    imageUploadPreview.style.filter = `sepia(${effectValue * 0.01})`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--marvin`)) {
    imageUploadPreview.style.filter = `invert(${effectValue}%)`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--phobos`)) {
    imageUploadPreview.style.filter = `blur(${effectValue * 0.03}px)`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--heat`)) {
    imageUploadPreview.style.filter = `brightness(${(0.3333 + effectValue / 133.33) * 3})`;
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

const onHashtagsInput = () => {
  const hashtags = textHashtags.value.toLowerCase().split(` `);
  const regularHashtag = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    textHashtags.setCustomValidity(`Используйте не более ${MAX_HASHTAGS_COUNT} хэш-тегов`);
  } else if ((new Set(hashtags)).size < hashtags.length) {
    textHashtags.setCustomValidity(`Хэш-теги не должны повторяться`);
  } else {
    hashtags.forEach((item) => {
      if (!regularHashtag.test(item) && textHashtags.value !== ``) {
        textHashtags.setCustomValidity(`Введите корректный хэш-тег`);
      } else {
        textHashtags.setCustomValidity(``);
      }
    });
  }

  textHashtags.reportValidity();
};

const onDescriptionInput = () => {
  const descriptionLength = textDescription.value.length;

  if (descriptionLength > MAX_DESCRIPTION_LENGTH) {
    textDescription.setCustomValidity(`Сообщение слишком длинное. Удалите лишние ${descriptionLength - MAX_DESCRIPTION_LENGTH} симв.`);
  } else {
    textDescription.setCustomValidity(``);
  }

  textDescription.reportValidity();
};

textHashtags.addEventListener(`input`, onHashtagsInput);
textDescription.addEventListener(`input`, onDescriptionInput);


// Отправляет данные с формы на сервер
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);

const renderResponse = (template, messageText, buttonText) => {
  const responseMessage = template.cloneNode(true);
  const responseButton = responseMessage.querySelector(`button`);

  responseMessage.querySelector(`h2`).textContent = messageText;
  responseButton.textContent = buttonText;

  const onResponseButtonClick = () => {
    responseMessage.remove();
    responseButton.removeEventListener(`click`, onResponseButtonClick);
    document.removeEventListener(`click`, onResponseButtonClick);
  };

  responseButton.addEventListener(`click`, onResponseButtonClick);
  document.addEventListener(`click`, onResponseButtonClick);

  document.querySelector(`main`).appendChild(responseMessage);
};

const successUploadForm = function () {
  onUploadCancelClick();
  renderResponse(
      successTemplate,
      `Изображение успешно загружено`, `Круто!`
  );
};

const errorUploadForm = (errorMessage) => {
  onUploadCancelClick();
  renderResponse(
      errorTemplate,
      errorMessage, `Попробовать загрузить другой файл`
  );
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  onHashtagsInput();
  onDescriptionInput();
  window.backend.upload(new FormData(window.move.imageUploadForm), successUploadForm, errorUploadForm);
};

window.move.imageUploadForm.addEventListener(`submit`, onFormSubmit);

window.form = {};
window.form.errorTemplate = errorTemplate;
window.form.renderResponse = renderResponse;
