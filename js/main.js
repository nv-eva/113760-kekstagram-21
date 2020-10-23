'use strict';

(function () {
  window.main = {
    getRandomIndex: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomElement: function (array) {
      return array[window.main.getRandomIndex(0, array.length)];
    }
  };
})();

// 2.1. Показывает элемент big-picture
const usersPhotos = document.querySelectorAll(`.picture`);
const bigPictureCancel = window.bigPicture.querySelector(`#picture-cancel`);

const onBigPictureEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const showBigPicture = function () {
  window.bigPicture.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onBigPictureEscPress);
  fixBody();
};

const hideBigPicture = function () {
  window.bigPicture.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onBigPictureEscPress);
  unfixBody();
};

for (let k = 0; k < usersPhotos.length; k++) {
  const currentUserPhoto = usersPhotos[k];

  currentUserPhoto.addEventListener(`click`, function () {
    window.renderBigPicture(window.photos[k]);
    hidecounterComments();
    showBigPicture();
  });

  currentUserPhoto.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.renderBigPicture(window.photos[k]);
      hidecounterComments();
      showBigPicture();
    }
  });
}

bigPictureCancel.addEventListener(`click`, hideBigPicture);

bigPictureCancel.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    hideBigPicture();
  }
});


// 2.2. Прячет блоки счетчика комментариев и загрузки новых комментариев
const hidecounterComments = function () {
  const counterComments = window.bigPicture.querySelector(`.social__comment-count`);
  counterComments.classList.add(`hidden`);

  const loaderComments = window.bigPicture.querySelector(`.comments-loader`);
  loaderComments.classList.add(`hidden`);
};


// 2.3. Добавляет и удаляет у body класс modal-open
const body = document.querySelector(`body`);

const fixBody = function () {
  body.classList.add(`modal-open`);
};

const unfixBody = function () {
  body.classList.remove(`modal-open`);
};


// 1.1. Показывает и скрывает окно загрузки фото
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
  fixBody();
  // Прописывает загруженному превью изображения рамер 100%
  scaleValue = 1;
  renderScaleControlValue();
  renderImageScale();
  checkScaleControls();
  // Сбрасывает с превью изображения все эффекты
  effectValue = START_EFFECT_VALUE;
  renderEffectLevel();
  removeAllImageEffects();
  imageUploadPreview.classList.add(`effects__preview--none`);
  uploadEffectLevel.classList.add(`hidden`);
};

const closeUpload = function () {
  imageUploadOverlay.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  unfixBody();
  // Сбрасывает значения в форме
  uploadOpenFile.value = ``;
  textDescription.value = ``;
  textHashtags.value = ``;
};

uploadOpenFile.addEventListener(`change`, openUpload);

uploadCancel.addEventListener(`click`, closeUpload);

uploadCancel.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closeUpload();
  }
});


// 1.2. Редактирование размера изображения
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

const scaleSmaller = function () {
  if (scaleValue - scaleStep >= MIN_SCALE * 0.01) {
    scaleValue -= scaleStep;
    renderScaleControlValue();
    renderImageScale();
  }
};

const scaleBigger = function () {
  if (scaleValue + scaleStep <= MAX_SCALE * 0.01) {
    scaleValue += scaleStep;
    renderScaleControlValue();
    renderImageScale();
  }
};

scaleControlSmaller.addEventListener(`click`, function () {
  scaleSmaller();
  checkScaleControls();
});

scaleControlBigger.addEventListener(`click`, function () {
  scaleBigger();
  checkScaleControls();
});

scaleControlValue.addEventListener(`keydown`, function (evt) {
  if (evt.key === `ArrowLeft`) {
    scaleSmaller();
    checkScaleControls();
  }
});

scaleControlValue.addEventListener(`keydown`, function (evt) {
  if (evt.key === `ArrowRight`) {
    scaleBigger();
    checkScaleControls();
  }
});


// 1.2. Применение эффекта для изображения
const imageUploadForm = document.querySelector(`.img-upload__form`);
const uploadEffectLevel = imageUploadForm.querySelector(`.img-upload__effect-level`);
const effectLevelValue = imageUploadForm.querySelector(`.effect-level__value`);
const effectLevelPin = imageUploadForm.querySelector(`.effect-level__pin`);

const START_EFFECT_VALUE = 100;
const NEW_EFFECT_VALUE = 40; // временная пременная
let effectValue = START_EFFECT_VALUE;

const renderEffectLevel = function () {
  effectLevelValue.value = effectValue;
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
    removeAllImageEffects();
    imageUploadPreview.classList.add(`effects__preview--` + evt.target.value);

    effectValue = START_EFFECT_VALUE;
    renderEffectLevel();

    if (evt.target.value === `none`) {
      uploadEffectLevel.classList.add(`hidden`);
    } else {
      uploadEffectLevel.classList.remove(`hidden`);

      effectLevelPin.addEventListener(`mouseup`, function () {
        effectValue = NEW_EFFECT_VALUE; // временная пременная
        renderEffectLevel();

        removeAllImageEffects();
        if (evt.target.value === `chrome`) {
          imageUploadPreview.style.filter = `grayscale(` + renderEffectValue(1, 0) + `)`;
        } else if (evt.target.value === `sepia`) {
          imageUploadPreview.style.filter = `sepia(` + renderEffectValue(1, 0) + `)`;
        } else if (evt.target.value === `marvin`) {
          imageUploadPreview.style.filter = `invert(` + renderEffectValue(100, 0) + `%)`;
        } else if (evt.target.value === `phobos`) {
          imageUploadPreview.style.filter = `blur(` + renderEffectValue(3, 0) + `px)`;
        } else if (evt.target.value === `heat`) {
          imageUploadPreview.style.filter = `brightness(` + renderEffectValue(3, 1) + `)`;
        }
      });
    }
  }
};

imageUploadForm.addEventListener(`change`, effectsChangeHandler);


// 1.3. Валидация хэштегов и комментариев
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
  if (evt.key === `Enter`) {
    validationHashtags();
  }
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
