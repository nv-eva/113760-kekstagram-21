'use strict';

const photoListElement = document.querySelector(`.pictures`);
const bigPictureCancel = window.preview.bigPicture.querySelector(`#picture-cancel`);

const onBigPictureEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    onBigPictureCancelClick();
  }
};

const openBigPicture = () => {
  window.preview.bigPicture.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onBigPictureEscPress);
  window.main.fixBody();
};

const onBigPictureCancelClick = () => {
  window.preview.bigPicture.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onBigPictureEscPress);
  window.main.unfixBody();

  window.preview.bigPicture.querySelector(`.social__footer-text`).value = ``;
};

const showBigPicture = (photo) => {
  window.preview.renderBigPicture(photo);
  openBigPicture();
};

// Отрисовывает фотографии на странице
let userPhotos = [];

const renderPictures = (photos) => {
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

const removePhotos = () => {
  document.querySelectorAll(`.picture`).forEach((item) => {
    item.remove();
  });
};

const updatePhotos = () => {
  removePhotos();
  const filtredPhotos = userPhotos.slice();
  renderPictures(window.filters.onChange(filtredPhotos));
};

const filterButtons = window.filters.image.querySelectorAll(`.img-filters__button`);

const removeActiveClass = () => {
  filterButtons.forEach((item) => {
    item.classList.remove(`img-filters__button--active`);
  });
};

const showFilters = () => {
  window.filters.image.classList.remove(`img-filters--inactive`);

  filterButtons.forEach((item) => {
    item.addEventListener(`click`, window.debounce(() => {
      removeActiveClass();
      item.classList.add(`img-filters__button--active`);
      updatePhotos();
    }));
  });
};

const successRender = (data) => {
  userPhotos = data;
  renderPictures(userPhotos);
  showFilters();
};

const errorRender = (errorMessage) => {
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
