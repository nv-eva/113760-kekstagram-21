'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_SAVE = `https://21.javascript.pages.academy/kekstagram`;
const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

const getBackendResponse = function (onLoad, onError, method, url, data) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за\u00A0${xhr.timeout}\u00A0мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);
  xhr.send(data);
};

window.backend = {
  load(onLoad, onError) {
    getBackendResponse(onLoad, onError, `GET`, URL_LOAD);
  },

  upload(data, onLoad, onError) {
    getBackendResponse(onLoad, onError, `POST`, URL_SAVE, data);
  }
};
