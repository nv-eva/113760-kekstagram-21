'use strict';
(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;

  const backendResponse = function (onLoad, method, url) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onLoad(xhr.response);
    });

    xhr.open(method, url);
    xhr.send();
  };

  window.backend = {
    load(onLoad) {
      backendResponse(onLoad, `GET`, URL_LOAD);
    }
  };
})();
