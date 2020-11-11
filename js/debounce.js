'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

let lastTimeout = null;

window.debounce = (cb) => {
  return function (...parameters) {
    if (lastTimeout) {
      return;
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
      window.clearTimeout(lastTimeout);
      lastTimeout = null;
    }, DEBOUNCE_INTERVAL);
  };
};
