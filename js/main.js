'use strict';

const USER_NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`, `Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Нионго`, `Ирвинг`];
const USER_MESSAGES = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const COUNT_PHOTOS = 25;

// 1.1. Создает массив фотографий с описаниями
const getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomElement = function (array) {
  return array[getRandomIndex(0, array.length)];
};

const photosIndex = Array(COUNT_PHOTOS).fill().map((e, i) => i + 1);

const generatePhoto = function () {
  const photo = {};

  const generateMessage = function () {
    let message = getRandomElement(USER_MESSAGES);
    if (Math.random() > 0.5) {
      message += ` ` + getRandomElement(USER_MESSAGES);
    }
    return (message);
  };

  const generateComment = function () {
    const comment = {};
    comment.avatar = String(`img/avatar-` + getRandomIndex(1, 6) + `.svg`);
    comment.message = generateMessage();
    comment.name = getRandomElement(USER_NAMES);
    return (comment);
  };

  const generateComments = (countComments) =>
    (new Array(countComments)).fill(``).map(generateComment);

  photo.url = String(`photos/` + photosIndex[0] + `.jpg`);
  photo.description = String(`Описание к фотографии ` + photosIndex[0]);
  photo.likes = getRandomIndex(15, 200);
  photo.comments = generateComments(getRandomIndex(0, 15));

  photosIndex.shift();

  return (photo);
};

const generatePhotos = (countPhotos) =>
  (new Array(countPhotos)).fill(``).map(generatePhoto);

const photos = generatePhotos(COUNT_PHOTOS);


// 1.2. Создает DOM-элементы на основе массива и шаблона
const photoListElement = document.querySelector(`.pictures`);
const photoTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const renderPhoto = function (photo) {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
  return photoElement;
};


// 1.3. Вставляет сгенерированные элементы в документ
const fragment = document.createDocumentFragment();
for (let i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
photoListElement.appendChild(fragment);


// 2.1. Показывает элемент big-picture
const bigPicture = document.querySelector(`.big-picture`);
// bigPicture.classList.remove(`hidden`);

bigPicture.querySelector(`.big-picture__img img`).src = photos[0].url;
bigPicture.querySelector(`.likes-count`).textContent = photos[0].likes;
bigPicture.querySelector(`.comments-count`).textContent = photos[0].comments.length;
bigPicture.querySelector(`.social__caption`).textContent = photos[0].description;

const commentsList = bigPicture.querySelector(`.social__comments`);
const commentsItem = bigPicture.querySelector(`.social__comment`);

const renderComment = function (comment) {
  const photoComment = commentsItem.cloneNode(true);
  photoComment.querySelector(`.social__picture`).src = comment.avatar;
  photoComment.querySelector(`.social__picture`).alt = comment.name;
  photoComment.querySelector(`.social__text`).textContent = comment.message;
  return photoComment;
};

for (let j = 0; j < photos[0].comments.length; j++) {
  const comment = renderComment(photos[0].comments[j]);
  commentsList.appendChild(comment);
}


// 2.2. Прячет блоки счетчика комментариев и загрузки новых комментариев
const counterComments = bigPicture.querySelector(`.social__comment-count`);
counterComments.classList.add(`hidden`);

const loaderComments = bigPicture.querySelector(`.comments-loader`);
loaderComments.classList.add(`hidden`);


// 2.3. Добавляет body класс modal-open
const body = document.querySelector(`body`);

const fixBody = function () {
  body.classList.add(`modal-open`);
};

const unfixBody = function () {
  body.classList.remove(`hidden`);
};


// 1.1. Показывает и скрывает окно загрузки фото
const imageUpload = document.querySelector(`.img-upload`);
const imageUploadOverlay = imageUpload.querySelector(`.img-upload__overlay`);
const uploadOpenFile = imageUpload.querySelector(`#upload-file`);
const uploadCancel = imageUpload.querySelector(`#upload-cancel`);

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeUpload();
  }
};

// Показывает
// Надо доработать: открытие файла через изменения значения поля #upload-file
const openUpload = function () {
  imageUploadOverlay.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  fixBody();
};

uploadOpenFile.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  openUpload();
});

uploadOpenFile.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    openUpload();
  }
});

// Скрывает
const closeUpload = function () {
  imageUploadOverlay.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  unfixBody();
};

uploadCancel.addEventListener(`click`, function () {
  closeUpload();
});

uploadCancel.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closeUpload();
  }
});
