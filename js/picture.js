'use strict';

(function () {
  const photoTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const photoListElement = document.querySelector(`.pictures`);

  const renderPicture = function (photo) {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__img`).alt = photo.description;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    return photoElement;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < window.photos.length; i++) {
    fragment.appendChild(renderPicture(window.photos[i]));
  }
  photoListElement.appendChild(fragment);
})();
