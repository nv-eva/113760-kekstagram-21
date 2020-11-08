'use strict';

(function () {
  const photoListElement = document.querySelector(`.pictures`);
  const bigPictureCancel = window.bigPicture.querySelector(`#picture-cancel`);

  const onBigPictureEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideBigPicture();
    }
  };

  const openBigPicture = function () {
    window.bigPicture.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onBigPictureEscPress);
    window.main.fixBody();
  };

  const hideBigPicture = function () {
    window.bigPicture.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onBigPictureEscPress);
    window.main.unfixBody();
  };

  const showBigPicture = function (photo) {
    window.renderBigPicture(photo);
    openBigPicture();
  };

  // Отрисовывает фотографии на странице
  let userPhotos = [];

  const renderPictures = function (photos) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      const currentPhoto = window.renderPicture(photos[i]);

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
    renderPictures(window.filters.onChangeFilters(filtredPhotos));
  };

  const filterButtons = window.filters.imageFilters.querySelectorAll(`.img-filters__button`);

  const removeActiveClass = function () {
    filterButtons.forEach((item) => {
      item.classList.remove(`img-filters__button--active`);
    });
  };

  const showFilters = function () {
    window.filters.imageFilters.classList.remove(`img-filters--inactive`);

    filterButtons.forEach((item) => {
      item.addEventListener(`click`, function () {
        removeActiveClass();
        item.classList.add(`img-filters__button--active`);
        window.debounce(function () {
          updatePhotos();
        })();
      });
    });
  };

  const successRender = function (data) {
    userPhotos = data;
    renderPictures(userPhotos);
    showFilters();
  };

  const errorRender = function (errorMessage) {
    window.renderResponse(
        document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true),
        errorMessage, `ОК`
    );
  };

  window.backend.load(successRender, errorRender);

  bigPictureCancel.addEventListener(`click`, hideBigPicture);
  bigPictureCancel.addEventListener(`keydown`, function (evt) {
    window.main.isEnterEvent(evt, hideBigPicture);
  });
})();
