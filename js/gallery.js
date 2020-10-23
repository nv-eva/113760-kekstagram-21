'use strict';

(function () {
  // Отрисовывает маленькие фотографии на странице
  const photoListElement = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < window.photos.length; i++) {
    fragment.appendChild(window.renderPicture(window.photos[i]));
  }
  photoListElement.appendChild(fragment);

  // Управляет открытием и закрытием большой фотографии
  const usersPhotos = document.querySelectorAll(`.picture`);
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

  for (let k = 0; k < usersPhotos.length; k++) {
    const currentUserPhoto = usersPhotos[k];

    const showBigPicture = function () {
      window.renderBigPicture(window.photos[k]);
      hideCounterComments();
      openBigPicture();
    };

    currentUserPhoto.addEventListener(`click`, showBigPicture);
    currentUserPhoto.addEventListener(`keydown`, function (evt) {
      window.main.isEnterEvent(evt, showBigPicture);
    });
  }

  bigPictureCancel.addEventListener(`click`, hideBigPicture);
  bigPictureCancel.addEventListener(`keydown`, function (evt) {
    window.main.isEnterEvent(evt, hideBigPicture);
  });
})();
