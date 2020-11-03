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

  const hideCounterComments = function () {
    const counterComments = window.bigPicture.querySelector(`.social__comment-count`);
    counterComments.classList.add(`hidden`);

    const loaderComments = window.bigPicture.querySelector(`.comments-loader`);
    loaderComments.classList.add(`hidden`);
  };

  const showBigPicture = function (photo) {
    window.renderBigPicture(photo);
    hideCounterComments();
    openBigPicture();
  };

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

  let userPhotos = [];

  const removePhotos = function () {
    document.querySelectorAll(`.picture`).forEach((item) => {
      item.remove();
    });
  };

  const updatePhotos = function () {
    removePhotos();
    window.filters.onChangeFilters(userPhotos);
    renderPictures(userPhotos);
  };

  const successRender = function (data) {
    userPhotos = data;
    updatePhotos();
    window.filters.showFilters();
  };

  window.backend.load(successRender);

  bigPictureCancel.addEventListener(`click`, hideBigPicture);
  bigPictureCancel.addEventListener(`keydown`, function (evt) {
    window.main.isEnterEvent(evt, hideBigPicture);
  });

  window.gallery.updatePhotos = updatePhotos;
})();
