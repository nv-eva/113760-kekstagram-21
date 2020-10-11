'use strict';

const USER_NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`, `Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Нионго`, `Ирвинг`];
const USER_MESSEGES = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const COUNT_PHOTOS = 25;

// 1. Создает массив фотографий с описаниями
const getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomElement = function (array) {
  return array[getRandomIndex(0, array.length)];
};

const generatePhotos = function (countPhotos) {
  const photos = new Array(countPhotos);

  for (const i = 0; i < countPhotos; i++) {
    photos[i] = {};
    photos[i].url = `photos/{{i + 1}}.jpg`;
    photos[i].description = ``;
    photos[i].likes = getRandomIndex(15, 200);
    photos[i].avatar = `img/avatar-{{getRandomIndex(1, 6)}}.svg`;
    photos[i].name = getRandomElement(USER_NAMES);

    const comments = new Array(getRandomIndex(1, 6));
    photos[i].comments = comments;

    for (const j = 0; j < comments.length; j++) {
      const message = getRandomElement(USER_MESSEGES);
      if (Math.random() > 0.5) {
        message += ` ` + getRandomElement(USER_MESSEGES);
      }
      comments[j] = message;
      return (comments[j]);
    }

    return (photos[i]);
  }

  return (photos);
};

const photos = generatePhotos(COUNT_PHOTOS);

// 2. Создает DOM-элементы на основе массива и шаблона

/*
url подставьте как src изображения.
likes подставьте как текстовое содержание элемента .picture__likes.
comments подставьте как текстовое содержание элемента .picture__comments.
*/

// 3. Вставляет сгенерированные элементы в документ

/*
Отрисуйте сгенерированные DOM-элементы в блок .pictures.
Для вставки элементов используйте DocumentFragment.
*/
