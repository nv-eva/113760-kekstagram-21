'use strict';

(function () {
  const imageFilters = document.querySelector(`.img-filters`);
  const filterRandom = imageFilters.querySelector(`#filter-random`);
  const filterDiscussed = imageFilters.querySelector(`#filter-discussed`);

  const COUNT_PHOTOS = 10;

  const shuffle = function (array) {
    let j;
    let element;

    for (let i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      element = array[i];
      array[i] = array[j];
      array[j] = element;
    }
    return array;
  };

  window.filters = {
    onChangeFilters(array) {
      if (filterRandom.classList.contains(`img-filters__button--active`)) {
        array = shuffle(array);
        array.length = array.length < COUNT_PHOTOS ? array.length : COUNT_PHOTOS;
      } else if (filterDiscussed.classList.contains(`img-filters__button--active`)) {
        array.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
      }
      return array;
    }
  };

  window.filters.imageFilters = imageFilters;
})();
