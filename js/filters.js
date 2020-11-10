'use strict';

const COUNT_PHOTOS = 10;

const imageFilters = document.querySelector(`.img-filters`);
const filterRandom = imageFilters.querySelector(`#filter-random`);
const filterDiscussed = imageFilters.querySelector(`#filter-discussed`);

const shuffle = function (elements) {
  let j;
  let element;

  for (let i = elements.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    element = elements[i];
    elements[i] = elements[j];
    elements[j] = element;
  }
  return elements;
};

window.filters = {
  onFiltersChange(photos) {
    if (filterRandom.classList.contains(`img-filters__button--active`)) {
      photos = shuffle(photos);
      photos.length = photos.length < COUNT_PHOTOS ? photos.length : COUNT_PHOTOS;
    } else if (filterDiscussed.classList.contains(`img-filters__button--active`)) {
      photos.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
    }
    return photos;
  }
};

window.filters.imageFilters = imageFilters;
