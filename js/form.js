'use strict';

const PERCENT = 0.01;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const START_EFFECT_VALUE = 100;
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const minScale = MIN_SCALE * PERCENT;
const maxScale = MAX_SCALE * PERCENT;
const scaleStep = SCALE_STEP * PERCENT;
const startEffectValue = START_EFFECT_VALUE * PERCENT;

let scaleValue = startEffectValue;
let effectValue = START_EFFECT_VALUE;

const imageUpload = document.querySelector(`.img-upload`);
const imageUploadOverlay = imageUpload.querySelector(`.img-upload__overlay`);
const uploadOpenFile = imageUpload.querySelector(`#upload-file`);
const uploadCancel = imageUpload.querySelector(`#upload-cancel`);

const scaleControlSmaller = imageUpload.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imageUpload.querySelector(`.scale__control--bigger`);
const scaleControlValue = imageUpload.querySelector(`.scale__control--value`);
const imageUploadPreview = imageUpload.querySelector(`.img-upload__preview img`);

const uploadEffectLevel = window.move.uploadForm.querySelector(`.img-upload__effect-level`);

const textHashtags = window.move.uploadForm.querySelector(`.text__hashtags`);
const textDescription = window.move.uploadForm.querySelector(`.text__description`);

const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);


// Изменяет масштаб изображения
const renderScaleControlValue = () => {
  scaleControlValue.value = (scaleValue) * 100 + `%`;
};

const renderImageScale = () => {
  imageUploadPreview.style.transform = `scale(${scaleValue})`;
};

const checkScaleControls = () => {
  if (scaleValue <= minScale) {
    scaleControlSmaller.disabled = true;
    scaleControlSmaller.classList.add(`scale__control--disabled`);
  } else {
    scaleControlSmaller.disabled = false;
    scaleControlSmaller.classList.remove(`scale__control--disabled`);
  }

  if (scaleValue >= maxScale) {
    scaleControlBigger.disabled = true;
    scaleControlBigger.classList.add(`scale__control--disabled`);
  } else {
    scaleControlBigger.disabled = false;
    scaleControlBigger.classList.remove(`scale__control--disabled`);
  }
};

const changeScale = () => {
  renderScaleControlValue();
  renderImageScale();
  checkScaleControls();
};

const onScaleControlSmallerClick = () => {
  if (scaleValue - scaleStep >= minScale) {
    scaleValue -= scaleStep;
    changeScale();
  }
};

const onScaleControlBiggerClick = () => {
  if (scaleValue + scaleStep <= maxScale) {
    scaleValue += scaleStep;
    changeScale();
  }
};


// Применяет эффекты к изображению
const renderStartEffectLevel = () => {
  effectValue = START_EFFECT_VALUE;
  window.move.effectValue.value = effectValue;
  window.move.effectDepth.style.width = effectValue + `%`;
  window.move.effectPin.style.left = effectValue + `%`;
};

const removeAllImageEffects = () => {
  const effects = window.move.uploadForm.querySelectorAll(`input[type="radio"]`);
  effects.forEach((item, i) => {
    imageUploadPreview.classList.remove(`effects__preview--${effects[i].value}`);
  });
  imageUploadPreview.style.filter = ``;
};

const onEffectsChange = (evt) => {
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
  effectValue = window.move.effectValue.value;

  let filter = ``;
  let unit = ``;
  let min = 0;
  let max = 1;

  if (imageUploadPreview.classList.contains(`effects__preview--chrome`)) {
    filter = `grayscale`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--sepia`)) {
    filter = `sepia`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--marvin`)) {
    filter = `invert`;
    max = 100;
    unit = `%`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--phobos`)) {
    filter = `blur`;
    max = 3;
    unit = `px`;
  } else if (imageUploadPreview.classList.contains(`effects__preview--heat`)) {
    filter = `brightness`;
    min = 1;
    max = 3;
  }

  const value = effectValue * (max - min) / 100 + min;
  imageUploadPreview.style.filter = `${filter}(${value}${unit})`;
};


// Валидирует хэштеги и комментарии
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

const clearForm = () => {
  uploadOpenFile.value = ``;
  textDescription.value = ``;
  textHashtags.value = ``;
};


// Открывает и закрывает форму редактирования
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

  scaleValue = startEffectValue;
  changeScale();

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
  clearForm();
};


// Отправляет данные с формы на сервер
const renderBackendResponse = (template, messageText, buttonText) => {
  const responseMessage = template.cloneNode(true);
  const responseButton = responseMessage.querySelector(`button`);

  responseMessage.querySelector(`h2`).textContent = messageText;
  responseButton.textContent = buttonText;

  const onResponseEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onResponseButtonClick();
    }
  };

  const onResponseButtonClick = () => {
    responseButton.removeEventListener(`click`, onResponseButtonClick);
    document.removeEventListener(`click`, onResponseButtonClick);
    document.removeEventListener(`keydown`, onResponseEscPress);
    responseMessage.remove();
  };

  responseButton.addEventListener(`click`, onResponseButtonClick);
  document.addEventListener(`click`, onResponseButtonClick);
  document.addEventListener(`keydown`, onResponseEscPress);

  document.querySelector(`main`).appendChild(responseMessage);
};

const successUploadForm = () => {
  onUploadCancelClick();
  renderBackendResponse(successTemplate, `Изображение успешно загружено`, `Круто!`);
};

const errorUploadForm = (errorMessage) => {
  onUploadCancelClick();
  renderBackendResponse(errorTemplate, errorMessage, `Попробовать загрузить другой файл`
  );
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  onHashtagsInput();
  onDescriptionInput();
  window.backend.upload(new FormData(window.move.uploadForm), successUploadForm, errorUploadForm);
};


scaleControlSmaller.addEventListener(`click`, onScaleControlSmallerClick);
scaleControlValue.addEventListener(`keydown`, (evt) => {
  window.main.isLeftEvent(evt, onScaleControlSmallerClick);
});

scaleControlBigger.addEventListener(`click`, onScaleControlBiggerClick);
scaleControlValue.addEventListener(`keydown`, (evt) => {
  window.main.isRightEvent(evt, onScaleControlBiggerClick);
});

window.move.effectPin.addEventListener(`mousedown`, (evt) => {
  window.move.onMouseDown(evt, changeEffectValue);
});
window.move.effectPin.addEventListener(`keydown`, (evt) => {
  window.move.onArrowLeft(evt, changeEffectValue);
});
window.move.effectPin.addEventListener(`keydown`, (evt) => {
  window.move.onArrowRight(evt, changeEffectValue);
});

textHashtags.addEventListener(`input`, onHashtagsInput);
textDescription.addEventListener(`input`, onDescriptionInput);

uploadOpenFile.addEventListener(`change`, onFileLoad);

uploadCancel.addEventListener(`click`, onUploadCancelClick);
uploadCancel.addEventListener(`keydown`, (evt) => {
  window.main.isEnterEvent(evt, onUploadCancelClick);
});

window.move.uploadForm.addEventListener(`change`, onEffectsChange);
window.move.uploadForm.addEventListener(`submit`, onFormSubmit);

window.form = {
  error: errorTemplate,
  renderResponse: renderBackendResponse
};
