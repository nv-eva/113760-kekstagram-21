'use strict';
(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
  const URL_SAVE = `https://21.javascript.pages.academy/kekstagram`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const backendResponse = function (onLoad, onError, method, url, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load(onLoad, onError) {
      backendResponse(onLoad, onError, `GET`, URL_LOAD);
    },

    upload(data, onLoad, onError) {
      backendResponse(onLoad, onError, `POST`, URL_SAVE, data);
    }
  };
})();
