'use strict';
(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
  const URL_SAVE = `https://21.javascript.pages.academy/kekstagram`;

  const backendResponse = function (onLoad, method, url, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onLoad(xhr.response);
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load(onLoad) {
      backendResponse(onLoad, `GET`, URL_LOAD);
    },

    upload(data, onLoad) {
      backendResponse(onLoad, `POST`, URL_SAVE, data);
    }
  };
})();
