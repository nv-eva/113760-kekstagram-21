'use strict';

const photoListElement = document.querySelector(`.pictures`);
const bigPictureCancel = window.preview.bigPicture.querySelector(`#picture-cancel`);
const filtersForm = window.filters.image.querySelector(`.img-filters__form`);
const filterButtons = window.filters.image.querySelectorAll(`.img-filters__button`);

let userPhotos = [];

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

const showBigPicture = (photo) => {
  window.preview.renderBigPicture(photo);
  openBigPicture();
};

const onBigPictureCancelClick = () => {
  window.preview.bigPicture.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onBigPictureEscPress);
  window.main.unfixBody();

  window.preview.bigPicture.querySelector(`.social__footer-text`).value = ``;
};

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  for (const photo of photos) {
    const currentPhoto = window.picture(photo);

    currentPhoto.addEventListener(`click`, () => {
      showBigPicture(photo);
    });
    currentPhoto.addEventListener(`keydown`, (evt) => {
      window.main.isEnterEvent(evt, () => {
        showBigPicture(photo);
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

const removeActiveClass = () => {
  filterButtons.forEach((item) => {
    item.classList.remove(`img-filters__button--active`);
  });
};

const showFilters = () => {
  window.filters.image.classList.remove(`img-filters--inactive`);
  filtersForm.addEventListener(`click`, window.debounce(updatePhotos));

  filterButtons.forEach((item) => {
    item.addEventListener(`click`, () => {
      removeActiveClass();
      item.classList.add(`img-filters__button--active`);
    });
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

bigPictureCancel.addEventListener(`click`, onBigPictureCancelClick);
bigPictureCancel.addEventListener(`keydown`, (evt) => {
  window.main.isEnterEvent(evt, onBigPictureCancelClick);
});

window.backend.load(successRender, errorRender);
