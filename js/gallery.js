'use strict';

const photoListElement = document.querySelector(`.pictures`);
const bigPictureCancel = window.preview.bigPicture.querySelector(`#picture-cancel`);

const onBigPictureEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    onBigPictureCancelClick();
  }
};

const openBigPicture = function () {
  window.preview.bigPicture.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onBigPictureEscPress);
  window.main.fixBody();
};

const onBigPictureCancelClick = function () {
  window.preview.bigPicture.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onBigPictureEscPress);
  window.main.unfixBody();

  window.preview.bigPicture.querySelector(`.social__footer-text`).value = ``;
};

const showBigPicture = function (photo) {
  window.preview.renderBigPicture(photo);
  openBigPicture();
};

// Отрисовывает фотографии на странице
let userPhotos = [];

const renderPictures = function (photos) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const currentPhoto = window.picture(photos[i]);

    currentPhoto.addEventListener(`click`, function () {
      showBigPicture(photos[i]);
    });
    currentPhoto.addEventListener(`keydown`, function (evt) {
      window.main.isEnterEvent(evt, function () {
        showBigPicture(photos[i]);
      });
    });

    fragment.appendChild(currentPhoto);
  }

  photoListElement.appendChild(fragment);
};

const removePhotos = function () {
  document.querySelectorAll(`.picture`).forEach((item) => {
    item.remove();
  });
};

const updatePhotos = function () {
  removePhotos();
  const filtredPhotos = userPhotos.slice();
  renderPictures(window.filters.onChange(filtredPhotos));
};

const filterButtons = window.filters.image.querySelectorAll(`.img-filters__button`);

const removeActiveClass = function () {
  filterButtons.forEach((item) => {
    item.classList.remove(`img-filters__button--active`);
  });
};

const showFilters = function () {
  window.filters.image.classList.remove(`img-filters--inactive`);

  filterButtons.forEach((item) => {
    item.addEventListener(`click`, window.debounce(() => {
      removeActiveClass();
      item.classList.add(`img-filters__button--active`);
      updatePhotos();
    }));
  });
};

const successRender = function (data) {
  userPhotos = data;
  renderPictures(userPhotos);
  showFilters();
};

const errorRender = function (errorMessage) {
  window.form.renderResponse(
      window.form.errorTemplate,
      errorMessage, `ОК`
  );
};

window.backend.load(successRender, errorRender);

bigPictureCancel.addEventListener(`click`, onBigPictureCancelClick);
bigPictureCancel.addEventListener(`keydown`, function (evt) {
  window.main.isEnterEvent(evt, onBigPictureCancelClick);
});
