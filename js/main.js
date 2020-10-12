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

  const generateComments = (countComments) =>
    (new Array(countComments)).fill(``).map(generateMessage);

  photo.url = String(`photos/` + photosIndex[0] + `.jpg`);
  photo.description = String(`Описание к фотографии ` + photosIndex[0]);
  photosIndex.shift();

  photo.comments = generateComments(getRandomIndex(0, 30));
  photo.likes = getRandomIndex(15, 200);
  photo.name = getRandomElement(USER_NAMES);
  photo.avatar = String(`img/avatar-` + getRandomIndex(1, 6) + `.svg`);

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
bigPicture.classList.remove(`hidden`);

bigPicture.querySelector(`.big-picture__img`).children.src = photos[0].url;
bigPicture.querySelector(`.likes-count`).textContent = photos[0].likes;
bigPicture.querySelector(`.comments-count`).textContent = photos[0].comments.length;

/*
комментарии должны вставляться в блок .social__comments.
Разметка каждого комментария должна выглядеть так:
*/

bigPicture.querySelector(`.social__caption`).textContent = photos[0].description;


// 2.2. Прячет блоки счетчика комментариев и загрузки новых комментариев
const counterComments = bigPicture.querySelector(`.social__comment-count`);
counterComments.classList.add(`hidden`);

const loaderComments = bigPicture.querySelector(`.comments-loader`);
loaderComments.classList.add(`hidden`);

// 2.3. Добавляет body класс modal-open
/*
Добавьте на <body> класс modal-open,
чтобы контейнер с фотографиями позади не прокручивался при скролле.
*/
