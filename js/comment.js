'use strict';

(function () {
  window.hideCounterComments = function () {
    const counterComments = window.bigPicture.querySelector(`.social__comment-count`);
    counterComments.classList.add(`hidden`);

    const loaderComments = window.bigPicture.querySelector(`.comments-loader`);
    loaderComments.classList.add(`hidden`);
  };
})();
