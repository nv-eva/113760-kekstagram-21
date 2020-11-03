'use strict';

(function () {
  const imageFilters = document.querySelector(`.img-filters`);
  const filterButtons = imageFilters.querySelectorAll(`.img-filters__button`);
  const filterDefault = imageFilters.querySelector(`#filter-default`);
  const filterRandom = imageFilters.querySelector(`#filter-random`);
  // const filterDiscussed = imageFilters.querySelector(`#filter-discussed`);

  const COUNT_PHOTO = 10;

  const removeActiveClass = function () {
    filterButtons.forEach((item) => {
      item.classList.remove(`img-filters__button--active`);
    });
  };

  window.filters = {
    showFilters() {
      imageFilters.classList.remove(`img-filters--inactive`);

      filterButtons.forEach((item) => {
        item.addEventListener(`click`, function () {
          removeActiveClass();
          item.classList.add(`img-filters__button--active`);
          window.gallery.updatePhotos();
        });
      });
    },

    onChangeFilters(array) {
      if (filterDefault.classList.contains(`img-filters__button--active`)) {
        return array;
      } else if (filterRandom.classList.contains(`img-filters__button--active`)) {
        array.length = COUNT_PHOTO;
        const newArray = array;
        return newArray;
      }
    }
  };
})();
