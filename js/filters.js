'use strict';

(function () {
  const imageFilters = document.querySelector(`.img-filters`);
  const filterButtons = imageFilters.querySelectorAll(`.img-filters__button`);

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
        });
      });
    }
  };
})();
