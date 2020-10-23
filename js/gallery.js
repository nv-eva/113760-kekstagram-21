'use strict';

(function () {
  const photoListElement = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < window.photos.length; i++) {
    fragment.appendChild(window.renderPicture(window.photos[i]));
  }
  photoListElement.appendChild(fragment);


})();
