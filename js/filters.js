'use strict';

(function () {
  const imageFilters = document.querySelector(`.img-filters`);
  const filterDefault = imageFilters.querySelector(`#filter-default`);
  const filterRandom = imageFilters.querySelector(`#filter-random`);
  // const filterDiscussed = imageFilters.querySelector(`#filter-discussed`);

  const COUNT_PHOTO = 10;

  window.filters = {
    onChangeFilters(array) {
      let filtredArray = [];
      if (filterDefault.classList.contains(`img-filters__button--active`)) {
        filtredArray = array;
      } else if (filterRandom.classList.contains(`img-filters__button--active`)) {
        filtredArray = array;
        filtredArray.length = COUNT_PHOTO;
      }
      return filtredArray;
    }
  };

  window.filters.imageFilters = imageFilters;
})();
