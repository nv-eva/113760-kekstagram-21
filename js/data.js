'use strict';

(function () {
  const USER_NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`, `Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Нионго`, `Ирвинг`];
  const USER_MESSAGES = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
  const COUNT_PHOTOS = 25;

  const photosIndex = Array(COUNT_PHOTOS).fill().map((e, i) => i + 1);

  const generateMessage = function () {
    let message = window.main.getRandomElement(USER_MESSAGES);
    if (Math.random() > 0.5) {
      message += ` ` + window.main.getRandomElement(USER_MESSAGES);
    }
    return (message);
  };

  const generateComment = function () {
    const comment = {};
    comment.avatar = String(`img/avatar-` + window.main.getRandomIndex(1, 6) + `.svg`);
    comment.message = generateMessage();
    comment.name = window.main.getRandomElement(USER_NAMES);
    return (comment);
  };

  const generateComments = (countComments) =>
    (new Array(countComments)).fill(``).map(generateComment);

  const generatePhoto = function () {
    const photo = {};
    photo.url = String(`photos/` + photosIndex[0] + `.jpg`);
    photo.description = String(`Описание к фотографии ` + photosIndex[0]);
    photo.likes = window.main.getRandomIndex(15, 200);
    photo.comments = generateComments(window.main.getRandomIndex(0, 15));
    photosIndex.shift();
    return (photo);
  };

  const generatePhotos = (countPhotos) =>
    (new Array(countPhotos)).fill(``).map(generatePhoto);

  const photos = generatePhotos(COUNT_PHOTOS);
  window.photos = photos;
})();
